using Microsoft.AspNetCore.Builder;

namespace SchoolERP.Shared.Middleware;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseGlobalExceptionMapping(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionMappingMiddleware>();
    }
}