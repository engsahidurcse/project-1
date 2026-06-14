namespace SchoolERP.Shared.Entities;

public class OrganizationWithTableRowData
{
    public int SerialNo { get; set; } = 0;
    public int TableNameId { get; set; }
    public int TableRowId { get; set; }
    public int IsNeed { get; set; } // 0 = Yes, 1 = No
    public int OrganizationId { get; set; }
    public virtual TableNameData TableName { get; set; } = default!;
    public virtual OrganizationData Organization { get; set; } = default!;
}