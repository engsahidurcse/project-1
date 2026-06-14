namespace SchoolERP.Lookup.Domain.Entities;

public class LookUpData
{
    public int Id { get; set; }
    public int SerialNo { get; set; } = 0;
    [StringLength(maximumLength: 15)]
    public string LookUpCode { get; set; } = default!;
    [StringLength(maximumLength: 100)]
    public required string LookUpName { get; set; } = default!;
    [StringLength(maximumLength: 200)]
    public string LookUpBDName { get; set; } = default!;
    [StringLength(maximumLength: 15)]
    public string LookUpSymbol { get; set; } = default!;
    public int ParentId { get; set; } = 0;
    public int DDLFirstId { get; set; } = 0;
    public required int LookUpTypeId { get; set; } = 0;
    public int IsEntryForm { get; set; } = 0;
   // public int OrganizationId { get; set; } = 0;
    public int Active { get; set; } = 1;

}
