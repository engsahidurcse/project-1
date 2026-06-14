using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SchoolERP.Gateway.Middlewares;
using SchoolERP.Shared.Auth;
using Yarp.ReverseProxy.Transforms;
using StackExchange.Redis;
using SchoolERP.Gateway.Scaling; // 🎯 Added namespace for our custom autoscaler files

var builder = WebApplication.CreateBuilder(args);

// 1. Register official .NET Aspire Service Discovery infrastructure core services
builder.Services.AddServiceDiscovery();

// 2. Configure Dynamic CORS Policy from appsettings.json to restrict unauthorized domains
var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(allowedOrigins) // 🎯 Dynamically injects the array from appsettings.json
              .AllowAnyMethod()            // Allows GET, POST, PUT, DELETE, and OPTIONS
              .AllowAnyHeader()            // Allows custom authorization headers
              .AllowCredentials();         // Necessary to allow cookies/session sharing cross-origin
    });
});


// 3. Register Singleton ConnectionMultiplexer for your Custom Redis Middleware
var redisConnectionString = builder.Configuration.GetConnectionString("RedisConnection") ?? "localhost:6379";
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));

// 4. Register Custom Autoscaling Infrastructure Managers and Background Workers
builder.Services.AddSingleton<SmartScalerManager>();
builder.Services.AddHostedService<GatewayCpuMonitorWorker>();

// 5. Setup Centralized JWT Authentication Matrix with Custom Identity Scheme Configuration
builder.Services.AddAuthentication(AuthConstants.SchemeName)
    .AddJwtBearer(AuthConstants.SchemeName, options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = JwtConfig.Issuer,
            ValidAudience = JwtConfig.Audience,
            IssuerSigningKey = JwtConfig.GetSigningKey()
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // Intercept custom request header first (Postman/API Testing), fallback to browser cookies
                if (context.Request.Headers.TryGetValue(AuthConstants.HeaderName, out var headerToken))
                {
                    context.Token = headerToken.ToString().Trim();
                }
                else
                {
                    var token = context.Request.Cookies[AuthConstants.CookieName];
                    if (!string.IsNullOrEmpty(token))
                    {
                        context.Token = token;
                    }
                }
                return Task.CompletedTask;
            }
        };
    });

// 6. Configure Global Authorization Policies linked to the Custom Security Identity Scheme
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(AuthConstants.PolicyAuthenticated, policy =>
        policy.AddAuthenticationSchemes(AuthConstants.SchemeName).RequireAuthenticatedUser());

    options.AddPolicy(AuthConstants.PolicyDynamic, policy =>
        policy.AddAuthenticationSchemes(AuthConstants.SchemeName)
              .RequireAssertion(context => context.User.HasClaim(c => c.Type == "Permissions")));
});

// 7. Initialize YARP Reverse Proxy and bind to the .NET Aspire Service Discovery engine
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddServiceDiscoveryDestinationResolver()
    .AddTransforms(builderContext =>
    {
        builderContext.AddRequestTransform(transformContext =>
        {
            /// Safely extract active security context tokens across multiple environments
            string? activeToken = null;
            if (transformContext.HttpContext.Request.Headers.TryGetValue(AuthConstants.HeaderName, out var headerToken))
            {
                activeToken = headerToken.ToString().Trim();
            }
            else
            {
                activeToken = transformContext.HttpContext.Request.Cookies[AuthConstants.CookieName];
            }

            if (!string.IsNullOrEmpty(activeToken))
            {
                // Inject custom token wrapped inside the custom header identity to downstream services
                transformContext.ProxyRequest.Headers.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue(AuthConstants.HeaderName, activeToken);
                //// Inject as standard Bearer token down to downstream isolated microservice clusters
                //transformContext.ProxyRequest.Headers.Authorization =
                //    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", activeToken);
            }

            // Internal Security Handshake: Inject custom Secret Header to prevent direct microservice port bypass
            transformContext.ProxyRequest.Headers.Add(AuthConstants.InternalSecretHeader, AuthConstants.InternalSecretValue);

            return ValueTask.CompletedTask;
        });
    });

var app = builder.Build();

// ===================================================================================
// 🚨 HTTP APPLICATION PIPELINE ORDERING (Strict sequence execution is critical)
// ===================================================================================

app.UseRouting();

// Activate the strict custom dynamic CORS policy right after routing
app.UseCors("AllowSpecificOrigins");

// 8. Setup Core Middleware Security Pipeline (Ordering is critical)
app.UseAuthentication();
app.UseAuthorization();

// 9. Trigger the custom Redis distributed token validation logic prior to running the proxy engine
app.UseMiddleware<RedisAuthorizationMiddleware>();

// 10. Map, activate, and evaluate downstream paths via YARP Reverse Proxy engine
app.MapReverseProxy();

app.Run();