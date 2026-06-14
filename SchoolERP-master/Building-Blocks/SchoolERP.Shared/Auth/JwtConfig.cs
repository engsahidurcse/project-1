using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace SchoolERP.Shared.Auth;


public static class JwtConfig
{
    // High-entropy 512-bit symmetric encryption signature key matrix
    public const string SecretKey = "5f8d2c9a1b4e7f3a0c6b9d8e2f1a4c5b7d9e0f2a3b6c8d1e4f7a9b0c2d3e5f8a1b4c7d9e0f2a3b6c8d1e4f7a9b0c2d3e5f8a1b4c7d9e0f2a3b6c8d1e4f7a9b0c2";
    public const string Issuer = "SchoolERP.Auth";
    public const string Audience = "SchoolERP.Users";
    public const int TokenExpirationHours = 8;

    public static SymmetricSecurityKey GetSigningKey()
    {
        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
    }
}