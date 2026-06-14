using MediatR;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Auth.Application.Commands.Register; // Assuming you compiled Register here
using SchoolERP.Auth.Application.DTOs;
using SchoolERP.Auth.Application.Queries.Login;
using SchoolERP.Shared.Auth;

namespace SchoolERP.Auth.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
    {
        // 1. Dispatch the login execution matrix via MediatR pipeline
        var response = await _mediator.Send(new LoginQuery(request));

        // 2. Guard Rule: If the business logic failed inside handler, bypass cookie injection
        if (!response.Success || response.Data == null)
        {
            return BadRequest(response);
        }

        // 3. Configure secure anti-XSS client browser cookie storage options using system matrix
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, // Protects against Cross-Site Scripting (XSS) by blocking JavaScript access
            Secure = true,   // Enforces SSL HTTPS protocol encryption layers for transit safety
            SameSite = SameSiteMode.Strict, // Mitigates Cross-Site Request Forgery (CSRF) vectors completely
            Expires = DateTime.UtcNow.AddHours(JwtConfig.TokenExpirationHours) // Synchronized token lifetime expiration parameter
        };


        // 4. 🎯 FIXED: Append token using your custom system cookie name from AuthConstants
        Response.Cookies.Append(AuthConstants.CookieName, response.Data.Token, cookieOptions);

        // 5. Return final architectural envelope matrix (HTTP 200 OK equivalent)
        //var secureData = response.Data with { Token = "" };
        return Ok(new
        {
            response.Success,
            response.StatusCode,
            response.Message,
            response.Data.FullName,
            response.Data.UserTypeName,
            response.Data.Token
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
    {
        var response = await _mediator.Send(new RegisterCommand(request));
        return Ok(response);
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        string token = string.Empty;

        // 1. Try to extract the token from the custom security headers first
        if (Request.Headers.TryGetValue(AuthConstants.CookieName, out var tokenValues))
        {
            token = tokenValues.ToString();
        }
        // 2. Fallback: If header is missing, try to extract the token from secure HttpOnly cookies
        else if (Request.Cookies.TryGetValue(AuthConstants.CookieName, out var cookieToken))
        {
            token = cookieToken;
        }

        // 3. Guard Rule: If no token is detected, return immediate unauthorized envelope
        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { success = false, message = "No active session detected to logout!" });
        }

        // 4. Dispatch the token termination matrix via MediatR pipeline command
        var response = await _mediator.Send(new LogoutCommand(token));

        if (!response.Success)
        {
            return BadRequest(response);
        }

        // 5. Clean up the secure client browser cookie trail instantly
        Response.Cookies.Delete(AuthConstants.CookieName);

        return Ok(response);
    }
}