using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Domain.Entities;
using SchoolERP.Shared.Entities;

namespace SchoolERP.Lookup.Infrastructure.Persistence;

public class LookupDbContext : DbContext
{
    public LookupDbContext(DbContextOptions<LookupDbContext> options) : base(options)
    {

    }

    public DbSet<LookUpTypeData> LookUpTypeDatas { get; set; } = default!;
    public DbSet<LookUpData> LookUpDatas { get; set; } = default!;
    public DbSet<OrganizationData> OrganizationDatas { get; set; } = default!;
    public DbSet<OrganizationWithTableRowData> OrganizationWithTableRowDatas { get; set; } = default!;
    public DbSet<TableNameData> TableNameDatas { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure OrganizationData hierarchy (Self-Referencing)
        modelBuilder.Entity<OrganizationData>(entity =>
        {
            entity.HasIndex(o => new { o.RegistrationNo, o.ParentId }).IsUnique();
            entity.HasOne(d => d.Parent)
                  .WithMany(p => p.Children)
                  .HasForeignKey(d => d.ParentId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Unique indexes for optimized performance
        modelBuilder.Entity<LookUpTypeData>()
            .HasIndex(o => new { o.LookUpTypeName, o.OrganizationId }).IsUnique();

        modelBuilder.Entity<TableNameData>()
            .HasIndex(o => new { o.DbName, o.TableName }).IsUnique();

        // 🎯 mapping composite key for OrganizationWithTableRowData
        modelBuilder.Entity<OrganizationWithTableRowData>()
            .HasKey(o => new { o.OrganizationId, o.TableNameId, o.TableRowId });
    }
}