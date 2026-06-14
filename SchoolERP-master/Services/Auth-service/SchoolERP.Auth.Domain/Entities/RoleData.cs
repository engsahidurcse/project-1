namespace SchoolERP.Auth.Domain.Entities;

public class RoleData
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string RoleName { get; set; } = string.Empty;
    public int Active { get; set; } = 1;

    // Navigation Property for RolesWiseMenuAssignData mapping
    public virtual ICollection<RolesWiseMenuAssignData> DataList { get; set; } = new List<RolesWiseMenuAssignData>();
}