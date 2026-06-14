namespace SchoolERP.Shared.Helpers;

/// <summary>
/// Centralized mapping helper for system identifiers
/// </summary>
public static class UserMappingHelper
{
    /// <summary>
    /// Converts raw database user type ID into human-readable string matrix
    /// </summary>
    public static string GetUserTypeName(int userTypeId)
    {
        return userTypeId switch
        {
            0 => "Super Admin",
            1 => "Admin",
            2 => "Teacher",
            3 => "Student",
            4 => "Parent",
            _ => "Staff" // Safe production fallback
        };
    }
}