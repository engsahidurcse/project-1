namespace SchoolERP.Auth.Domain.Entities;

public class UserMenuPermissionData
{
    // Composite / Navigation Keys
    public long UserDataId { get; set; }
    public int MenuDataId { get; set; } = 0;

    public int CanEdit { get; set; } = 0;
    public int CanDelete { get; set; } = 0;
    public int CanInsert { get; set; } = 0;
    public int CanView { get; set; } = 0;
    public int Active { get; set; } = 1;

    // Navigation Links
    public virtual MenuData MenuData { get; set; } = default!;
}