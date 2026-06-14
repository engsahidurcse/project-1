namespace SchoolERP.Auth.Domain.Entities;

public class RolesWiseMenuAssignData
{
    public int MenuDataId { get; set; }
    public int RoleDataId { get; set; }
    public int CanEdit { get; set; } = 0;
    public int CanDelete { get; set; } = 0;
    public int CanInsert { get; set; } = 0;
    public int CanView { get; set; } = 0;
}