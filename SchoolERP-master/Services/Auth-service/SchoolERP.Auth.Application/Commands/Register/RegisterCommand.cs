using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Auth.Application.DTOs; // Contains UserRegisterRequest contract
using SchoolERP.Auth.Domain.Entities;
using SchoolERP.Auth.Infrastructure.Identity;
using SchoolERP.Auth.Infrastructure.Persistence;
using SchoolERP.Shared.Responses; // 🎯 Injected Shared Response Matrix

namespace SchoolERP.Auth.Application.Commands.Register;

// Command returns the unified generic ApiResponse wrapper
public record RegisterCommand(UserRegisterRequest Request) : IRequest<ApiResponse<string>>;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ApiResponse<string>>
{
    private readonly AuthDbContext _context;
    private readonly PasswordService _passwordService;

    public RegisterCommandHandler(AuthDbContext context, PasswordService passwordService)
    {
        _context = context;
        _passwordService = passwordService;
    }

    public async Task<ApiResponse<string>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var req = command.Request;

        // 1. Guard Rule: If duplicate username, throw soft exception for the middleware to catch
        if (await _context.UserDatas.AnyAsync(u => u.UserName == req.UserName, cancellationToken))
        {
            throw new Exception("This username already taken inside system matrix!");
        }

        // 2. Guard Rule: Check duplicate email
        if (!string.IsNullOrEmpty(req.Email) && await _context.UserDatas.AnyAsync(u => u.UserEmail == req.Email, cancellationToken))
        {
            throw new Exception("This email already registered!");
        }

        // 3. Transform DTO to Core Domain Entity Map
        var user = new UserData
        {
            UserName = req.UserName,
            UserEmail = req.Email,
            FullName = req.FullName,
            Password = _passwordService.HashPassword(req.Password), // Secure hashing handshake
            UserRoleId = req.RoleId,
            UserTypeId = req.UserTypeId,
            OrganizationId = req.OrganizationId,
            Dob = DateTime.UtcNow,
            Active = 1
        };

        // 4. Commit to database infrastructure context
        _context.UserDatas.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        // 5. Return success contract matching the shared envelope structure (200 OK)
        return new ApiResponse<string>(
            Success: true,
            StatusCode: 200,
            Message: "This user registration completed successfully inside system matrix",
            Data: null
        );
    }
}