using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Lookup.Domain.Entities;

public class LookUpTypeData
{
    public int Id { get; set; }
    public int SerialNo { get; set; } = 0;
    [StringLength(maximumLength: 100)]
    public required string LookUpTypeName { get; set; } = default!;
    public int PowerNumber { get; set; } = 0;
    public int ChildYesNo { get; set; } = 0;
    public int ParentId { get; set; } = 0;
    public int ParentGroupType { get; set; } = 0;
    public int DDLParentId { get; set; } = 0;
    public int OrganizationId { get; set; } = 0;
    public int Active { get; set; } = 1;
}
