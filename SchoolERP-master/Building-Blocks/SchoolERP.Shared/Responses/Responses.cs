namespace SchoolERP.Shared.Responses;

/// <summary>
/// Centralized API Envelope for all Microservices (Enforces Uniform Architecture)
/// </summary>
public record ApiResponse<TData>(
    bool Success,
    int StatusCode,
    string Message,
    TData? Data = default
);