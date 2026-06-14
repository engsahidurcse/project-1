namespace SchoolERP.Auth.Domain.Entities;

public class UserDataPermissionData
{
    public long UserDataId { get; set; }
    public int TypeNo { get; set; } = 0; // 0 = LookUp, 1 = LookUp Type
    public int LookUpId { get; set; }

    public virtual UserData UserData { get; set; } = default!;
}
