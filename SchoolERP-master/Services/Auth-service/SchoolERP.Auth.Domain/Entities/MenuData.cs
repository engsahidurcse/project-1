namespace SchoolERP.Auth.Domain.Entities;

public class MenuData
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string MenuName { get; set; } = string.Empty;

    [StringLength(100)]
    public string? MenuBanglaName { get; set; }

    [Required]
    public string RouteName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string MenuURL { get; set; } = string.Empty;

    [StringLength(250)]
    public string? MenuTitle { get; set; }

    [StringLength(100)]
    public string? MenuIcon { get; set; }

    public int SerialNo { get; set; } = 0;
    public int MenuParentId { get; set; } = 0; // For Submenus

    // Default Access Matrix
    public int CanEdit { get; set; } = 0;
    public int CanDelete { get; set; } = 0;
    public int CanInsert { get; set; } = 0;
    public int CanView { get; set; } = 0;
    public int Active { get; set; } = 1;
}