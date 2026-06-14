using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Auth.Application.DTOs;
using SchoolERP.Auth.Infrastructure.Identity;
using SchoolERP.Auth.Infrastructure.Persistence;
using SchoolERP.Shared.Auth;
using SchoolERP.Shared.Helpers;
using SchoolERP.Shared.Responses;
using StackExchange.Redis;
using System.Text.Json; // 🎯 1. Injected Shared Helper for UserType mapping logic

namespace SchoolERP.Auth.Application.Queries.Login;

public record LoginQuery(UserLoginRequest Request) : IRequest<ApiResponse<LoginResult>>;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ApiResponse<LoginResult>>
{
    private readonly AuthDbContext _context;
    private readonly PasswordService _passwordService;
    private readonly JwtService _jwtService; 
    private readonly IConnectionMultiplexer _redis;

    public LoginQueryHandler(AuthDbContext context, PasswordService passwordService, JwtService jwtService, IConnectionMultiplexer redis)
    {
        _context = context;
        _passwordService = passwordService;
        _jwtService = jwtService; 
        _redis = redis;
    }

    public async Task<ApiResponse<LoginResult>> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        var req = request.Request;
         
        var user = await _context.UserDatas
            .FirstOrDefaultAsync(u => u.UserName == req.UserName || u.UserMobileNo == req.UserName || u.UserEmail == req.UserName, cancellationToken);

        if (user == null || user.Active == 0)
            throw new Exception("Invalid Username/Email or User account is inactive!");

        if (!_passwordService.VerifyPassword(req.Password, user.Password))
            throw new Exception("Invalid security credential matching matrix!");

        // 🎯 2. Use the shared helper to get the user type name based on the UserTypeId
        string userTypeName = UserMappingHelper.GetUserTypeName(user.UserTypeId);

        // =========================================================================
        // 2. Query permissions joined cleanly alongside active application UI Route configurations
        // =========================================================================
        var menuPermissions = await (
            from ump in _context.UserMenuPermissionDatas.AsNoTracking()
            join m in _context.MenuDatas.AsNoTracking() on ump.MenuDataId equals m.Id
            where ump.UserDataId == user.Id && ump.Active == 1 && m.RouteName != "/"
            select new MenuPermissionRedisDto // Utilizing cross-cutting shared architecture contracts
            {
                UserId = user.Id,
                RouteName = m.RouteName ?? "",
                CanView = ump.CanView,
                CanInsert = ump.CanInsert,
                CanEdit = ump.CanEdit,
                CanDelete = ump.CanDelete
            }
        ).ToListAsync(cancellationToken);

        // =========================================================================
        // 3. Write structured Action Permissions safely into Redis storage in Parallel
        // =========================================================================
        var db = _redis.GetDatabase();
        var cacheExpiry = TimeSpan.FromHours(JwtConfig.TokenExpirationHours);

        var menuTasks = menuPermissions.Select(p =>
        {
            // Normalize layout endpoints (e.g., /api/lookup/ -> lookup) to lock security namespaces (e.g., AUTH:501:lookup)
            var structuredRoute = p.RouteName.Replace("/", "").ToLower().Trim();
            var key = $"{AuthConstants.RedisAuthPrefix}{p.UserId}:{structuredRoute}";
            var value = JsonSerializer.Serialize(p);
            return db.StringSetAsync(key, value, cacheExpiry);
        });

        // Push commands simultaneously over multiplexer network streaming pipelines
        await Task.WhenAll(menuTasks);

        // =========================================================================
        // 4. Construct Central Gateway Map Link using generated security context token
        // =========================================================================

        var sessionMap = new GatewaySessionMapDto
        {
            UserId = user.Id,
            OrganizationId = user.OrganizationId
        };
        var token = _jwtService.GenerateToken(sessionMap);

        // Cache Master gateway token session details linked securely via cryptographic signature keys
        await db.StringSetAsync($"{AuthConstants.RedisSessionPrefix}{token}", JsonSerializer.Serialize(sessionMap), cacheExpiry);

        var loginResult = new LoginResult(token, user.FullName, userTypeName);

        return new ApiResponse<LoginResult>(
            Success: true,
            StatusCode: 200,
            Message: "Authentication handshake successful. Welcome back!",
            Data: loginResult
        );
    }
}