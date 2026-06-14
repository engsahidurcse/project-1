using Microsoft.AspNetCore.Http;
using SchoolERP.Shared.Auth;

namespace Microsoft.AspNetCore.Builder;

public static class GatewaySecurityExtensions
{
    public static IApplicationBuilder EnforceGatewayOnly(this IApplicationBuilder app)
    {
        return app.Use(async (context, next) =>
        {
            string path = context.Request.Path.Value ?? "";

            // 1. Bypass Evaluation: Pass anonymous platform status and swagger indicators seamlessly
            if (path.Contains("/api/health") ||
                path.Contains("/alive") ||
                path.Contains("/health") ||
                path.Contains("/swagger")) // 🎯 FIXED: Added Swagger bypass so you can still view individual service docs
            {
                await next();
                return;
            }

            // 2. Validate Internal Security Handshake Header Matrix
            if (!context.Request.Headers.TryGetValue(AuthConstants.InternalSecretHeader, out var extractedSecret))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "text/plain; charset=utf-8";
                await context.Response.WriteAsync("Direct port access is strictly blocked. Requests must route via the central Gateway.");
                return;
            }

            // 🎯 FIXED: YARP returns header values wrapped in a StringValues array. 
            // Comparing string directly with StringValues requires explicit string conversion to avoid evaluation mismatches.
            if (extractedSecret.ToString() != AuthConstants.InternalSecretValue)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "text/plain; charset=utf-8";
                await context.Response.WriteAsync("Security handshake fingerprint mismatch. Direct execution aborted.");
                return;
            }

            // 3. Secret handshake verified successfully, forward request down to the controller pipeline
            await next();
        });
    }
}