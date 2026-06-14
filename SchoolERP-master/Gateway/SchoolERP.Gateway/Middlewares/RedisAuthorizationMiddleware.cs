using SchoolERP.Shared.Auth;
using StackExchange.Redis;
using System.Text.Json;

namespace SchoolERP.Gateway.Middlewares;

public class RedisAuthorizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConnectionMultiplexer _redis;

    public RedisAuthorizationMiddleware(RequestDelegate next, IConnectionMultiplexer redis)
    {
        _next = next;
        _redis = redis;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string path = context.Request.Path.Value ?? "";

        // 1. Bypass Evaluation: Pass anonymous API configurations seamlessly
        if (path.Contains("/api/auth/login") ||
            path.Contains("/api/auth/register") ||
            path.Contains("/api/auth/logout") ||
            path.Contains("/api/health") ||
            path.Contains("/alive") ||
            path.Contains("/swagger"))
        {
            await _next(context);
            return;
        }

        // 2. DUAL VERIFICATION: Try Custom Header first (Postman Style), fallback to Cookie (Browser)
        string? token = null;

        if (context.Request.Headers.TryGetValue(AuthConstants.HeaderName, out var headerToken))
        {
            token = headerToken.ToString().Trim();
        }
        else if (context.Request.Cookies.TryGetValue(AuthConstants.CookieName, out var cookieToken))
        {
            token = cookieToken;
        }

        // Guard Rule: If no token is found in both Cookie and Header, return 401 Unauthorized
        if (string.IsNullOrEmpty(token))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "text/plain; charset=utf-8";
            await context.Response.WriteAsync("Unauthorized: Security access token (Cookie/Header) is missing!");
            return;
        }

        // 3. Redis Master Session Map Fetching Phase (Verifying if user is Authorized)
        var db = _redis.GetDatabase();
        var sessionCacheValue = await db.StringGetAsync($"{AuthConstants.RedisSessionPrefix}{token}");

        if (!sessionCacheValue.HasValue)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "text/plain; charset=utf-8";
            await context.Response.WriteAsync("Unauthorized: Session expired or invalid. Please login again.");
            return;
        }

        string sessionJson = sessionCacheValue.ToString();
        var session = JsonSerializer.Deserialize<GatewaySessionMapDto>(sessionJson);

        if (session == null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized: Session parsing context failed.");
            return;
        }

        // ===================================================================================
        // 🎯 4. TEMPORARILY DISABLED: Menu and Route Permission Verification Level
        // This block is bypassed for now since menus are not yet created. 
        // Right now, any user with a valid active session is fully Authorized to access APIs.
        // ===================================================================================
        /*
        var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (segments.Length >= 2)
        {
            string currentRoute = segments[1].ToLower().Trim();
            var authCacheKey = $"{AuthConstants.RedisAuthPrefix}{session.UserId}:{currentRoute}";

            var permissionCacheValue = await db.StringGetAsync(authCacheKey);
            if (!permissionCacheValue.HasValue)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden: You don't have permission to access this module.");
                return;
            }

            string permissionJson = permissionCacheValue.ToString();
            var permission = JsonSerializer.Deserialize<MenuPermissionRedisDto>(permissionJson);

            string httpMethod = context.Request.Method;
            bool isAllowed = false;

            if (httpMethod == HttpMethods.Get && permission!.CanView == 1) isAllowed = true;
            else if (httpMethod == HttpMethods.Post && permission!.CanInsert == 1) isAllowed = true;
            else if (httpMethod == HttpMethods.Put && permission!.CanEdit == 1) isAllowed = true;
            else if (httpMethod == HttpMethods.Delete && permission!.CanDelete == 1) isAllowed = true;

            if (!isAllowed)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync($"Forbidden: You do not have execution permission [{httpMethod}] for this route.");
                return;
            }
        }
        */

        // 5. Authorized successfully! Forward request to the downstream microservices
        await _next(context);
    }
}