using Microsoft.IdentityModel.Tokens;
using SchoolERP.Shared.Auth; // Direct access to Shared infrastructure config
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SchoolERP.Auth.Infrastructure.Identity;

public class JwtService
{
    public string GenerateToken(GatewaySessionMapDto user)
    {
        // 1. Maintain a lean payload by injecting only core system identifiers inside the claims matrix
        var claims = new List<Claim>
        {
            new Claim("UserId", user.UserId.ToString()),
            new Claim("OrgId", user.OrganizationId.ToString())
        };

        // 2. Fetch the high-entropy 512-bit signing key centralized in the Shared project
        var key = JwtConfig.GetSigningKey();

        // 3. Generate cryptographic digital signature using HMAC-SHA256 to ensure complete tamper-proofing
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: JwtConfig.Issuer,
            audience: JwtConfig.Audience,
            claims: claims,
            expires: DateTime.Now.AddHours(JwtConfig.TokenExpirationHours),
            signingCredentials: creds
        );

        // 4. Output the serialized JWT string token to be written into the high-security HttpOnly client cookie
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}