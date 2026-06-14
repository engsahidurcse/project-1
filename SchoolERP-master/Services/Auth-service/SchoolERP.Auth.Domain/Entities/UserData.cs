namespace SchoolERP.Auth.Domain.Entities;

public class UserData
{
    public long Id { get; set; }
    public int OrganizationId { get; set; } = 0;

    [Required]
    [StringLength(50)]
    public string UserName { get; set; } = string.Empty;

    [StringLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [StringLength(250)]
    public string Password { get; set; } = string.Empty; // Scrambled/Hashed format

    [StringLength(50)]
    public string? UserPhoto { get; set; }

    [Phone]
    [StringLength(50)]
    public string? UserMobileNo { get; set; }

    [EmailAddress]
    [StringLength(50)]
    public string? UserEmail { get; set; }

    [StringLength(255)]
    public string? UserAddress { get; set; }

    public DateTime Dob { get; set; }

    // Core ERP Identity Configurations
    public int UserRoleId { get; set; } = 0;
    public int UserTypeId { get; set; } = 0; // 0 = Super Admin, 1 = Admin, 2 = Teacher, 3 = Student, 4 = Parent

    public int UserGenderId { get; set; } = 0;
    public int UserReligionId { get; set; } = 0;
    public int UserBloodGroupId { get; set; } = 0;
    public int UserMaritalStatusId { get; set; } = 0;
    public int UserNationality { get; set; } = 0;
   // public long StudentId { get; set; } = 0;
    public int Active { get; set; } = 1;
}