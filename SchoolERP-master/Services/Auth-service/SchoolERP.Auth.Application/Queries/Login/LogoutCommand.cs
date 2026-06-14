using MediatR;
using SchoolERP.Shared.Auth;
using SchoolERP.Shared.Responses;
using StackExchange.Redis;

namespace SchoolERP.Auth.Application.Queries.Login;

// Defining the Logout Contract via MediatR Record Pipeline
public record LogoutCommand(string Token) : IRequest<ApiResponse<string>>;

public class LogoutCommandHandler : IRequestHandler<LogoutCommand, ApiResponse<string>>
{
    private readonly IConnectionMultiplexer _redis;

    public LogoutCommandHandler(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    public async Task<ApiResponse<string>> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var db = _redis.GetDatabase();

        // 1. Construct the precise master session key used during login initialization
        var sessionCacheKey = $"{AuthConstants.RedisSessionPrefix}{request.Token}";

        // 2. 🎯 CRITICAL STEPS: Check existence and drop the record to kill the user identity token session
        bool isDeleted = await db.KeyDeleteAsync(sessionCacheKey);

        if (!isDeleted)
        {
            return new ApiResponse<string>(
                Success: false,
                StatusCode: 400,
                Message: "Token execution failed. Session might be expired or already revoked.",
                Data: null
            );
        }

        // 3. Return final success confirmation model back to the gateway pipeline router
        return new ApiResponse<string>(
            Success: true,
            StatusCode: 200,
            Message: "Session terminated cleanly. Redis storage synchronized successfully!",
            Data: "Token Dead"
        );
    }
}