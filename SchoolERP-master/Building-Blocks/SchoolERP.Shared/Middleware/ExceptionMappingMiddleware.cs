using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace SchoolERP.Shared.Middleware;

public class ExceptionMappingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMappingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // 1. Set Network HTTP Header Status Code to 400
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            context.Response.ContentType = "application/json";

            // 2. Map payload cleanly matching the global ApiResponse matrix
            var errorResponse = new
            {
                success = false,
                statusCode = 400,
                message = ex.Message
            };

            var jsonResult = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(jsonResult);
        }
    }
}