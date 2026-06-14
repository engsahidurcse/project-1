namespace SchoolERP.Auth.Domain.Entities;
 
public class UserTransactionLogData
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public long UserId { get; set; }
    public int TableId { get; set; } = 0;

    [Required]
    public string TransactionLog { get; set; } = string.Empty;

    [StringLength(100)]
    public string? EventName { get; set; }

    [StringLength(100)]
    public string? MacAddress { get; set; }

    [StringLength(50)]
    public string? OSName { get; set; }

    [StringLength(15)]
    public string? IPAddress { get; set; }

    [StringLength(100)]
    public string? ComputerName { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;
}