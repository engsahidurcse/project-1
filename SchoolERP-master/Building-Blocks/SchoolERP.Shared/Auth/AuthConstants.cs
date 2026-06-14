namespace SchoolERP.Shared.Auth;

public static class AuthConstants
{
    // Custom Identity Scheme and Forwarding Header Name
    public const string SchemeName = "_scmn-sms-4p";
    public const string HeaderName = "_hdrn-sms_4p"; // 🎯 Postman Key: _hdrn-sms_4p

    // Internal Security Cryptographic Handshake to block direct port bypasses
    public const string InternalSecretHeader = "_2026-MY-FRI-ISH";
    public const string InternalSecretValue = "_ISV-FRI-15-05";

    // Client Browser Cookie Identifier
    public const string CookieName = "_KX-051526-Sms";

    public const string PolicyAuthenticated = "Authenticated";
    public const string PolicyDynamic = "DynamicPermission";

    // Centralized Redis Memory Key Prefix Allocations
    public const string RedisSessionPrefix = "SESSION:";
    public const string RedisAuthPrefix = "AUTH:";
}

// 🎯 Centralized Shared DTO: Maps the baseline user identity context inside Redis sessions
public class GatewaySessionMapDto
{
    public long UserId { get; set; }
    public int OrganizationId { get; set; }
}

// 🎯 Centralized Shared DTO: Maps operational role capabilities safely inside the Redis memory fabric
public class MenuPermissionRedisDto
{
    public long UserId { get; set; }
    public string RouteName { get; set; } = string.Empty;
    public int CanView { get; set; }
    public int CanInsert { get; set; }
    public int CanEdit { get; set; }
    public int CanDelete { get; set; }
}