using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Shared.Entities;

public class TableNameData
{
    public int Id { get; set; }

    [Required]
    [StringLength(250)]
    public string DbName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string TableName { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public int Active { get; set; } = 1;
}
