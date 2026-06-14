using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SchoolERP.Shared.Auth;

namespace Microsoft.Extensions.DependencyInjection;

public static class SharedAuthExtensions
{
    public static IServiceCollection AddSharedAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication(AuthConstants.SchemeName)
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
                        // A) Attempt to extract token from custom Cookie (for local network/browser context)
                        var token = context.Request.Cookies[AuthConstants.CookieName];

                        // B) If cookie is absent, extract token from the Gateway's custom forwarded Authorization Header
                        if (string.IsNullOrEmpty(token) &&
                            context.Request.Headers.TryGetValue("Authorization", out var authHeader))
                        {
                            var headerString = authHeader.ToString();
                            if (headerString.StartsWith($"{AuthConstants.HeaderName} ", StringComparison.OrdinalIgnoreCase))
                            {
                                token = headerString.Substring(AuthConstants.HeaderName.Length + 1).Trim();
                            }
                        }

                        if (!string.IsNullOrEmpty(token))
                        {
                            context.Token = token;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

        return services;
    }
}