using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Shared.Entities;

public class OrganizationData
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string RegistrationNo { get; set; } = default!;

    [Required]
    [StringLength(100)]
    public string OrganizationName { get; set; } = default!;

    [EmailAddress]
    [StringLength(50)]
    public string Email { get; set; } = default!;

    [StringLength(255)]
    public string Address { get; set; } = default!;

    [Phone]
    [StringLength(50)]
    public string Phone { get; set; } = default!;

    [Url]
    [StringLength(50)]
    public string Website { get; set; } = default!;

    [DataType(DataType.Date)]
    [Display(Name = "Licensed Up to")]
    public DateTime LicensedUpto { get; set; }

    [DataType(DataType.Date)]
    [Display(Name = "Start Date")]
    public DateTime StartDate { get; set; }

    [DataType(DataType.Date)]
    [Display(Name = "Closed Date")]
    public DateTime? ClosedDate { get; set; }

    // Hierarchy Logic
    public int? ParentId { get; set; }

    [ForeignKey("ParentId")]
    public virtual OrganizationData? Parent { get; set; }
    public virtual ICollection<OrganizationData> Children { get; set; } = [];
}
