namespace SchoolERP.Auth.Application.DTOs;

// Built-in Identity overlap erite dynamic naming convention
public record UserRegisterRequest(string UserName, string Email, string Password, string FullName, int RoleId, int UserTypeId, int OrganizationId);
public record UserLoginRequest(string UserName, string Password); 
public record LoginResult(string Token, string FullName, string UserTypeName);