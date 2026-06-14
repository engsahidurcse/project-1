// NuGet package: BCrypt.Net-Next
namespace SchoolERP.Auth.Infrastructure.Identity;

public class PasswordService
{
    // Password hash/encrypt korar jonno
    public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    // Password check/verify korar real command holo BCrypt.Verify
    public bool VerifyPassword(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);
}