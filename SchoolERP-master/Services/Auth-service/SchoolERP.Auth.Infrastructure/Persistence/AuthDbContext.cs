using Microsoft.EntityFrameworkCore;

namespace SchoolERP.Auth.Infrastructure.Persistence;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    public DbSet<UserData> UserDatas => Set<UserData>();
    public DbSet<UserMenuPermissionData> UserMenuPermissionDatas => Set<UserMenuPermissionData>();
    public DbSet<UserDataPermissionData> UserDataPermissionDatas => Set<UserDataPermissionData>();
    public DbSet<UserTransactionLogData> UserTransactionLogDatas => Set<UserTransactionLogData>();
    public DbSet<UserToStudentRelationData> UserToStudentRelationDatas => Set<UserToStudentRelationData>();

    public DbSet<MenuData> MenuDatas => Set<MenuData>();
    public DbSet<RoleData> RoleDatas => Set<RoleData>();
    public DbSet<RolesWiseMenuAssignData> RolesWiseMenuAssignDatas => Set<RolesWiseMenuAssignData>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 1. UserMenuPermissionData Composite Key Mapping
        modelBuilder.Entity<UserMenuPermissionData>()
            .HasKey(mp => new { mp.UserDataId, mp.MenuDataId });

        // 2. RolesWiseMenuAssignData Composite Key Mapping
        modelBuilder.Entity<RolesWiseMenuAssignData>()
            .HasKey(rw => new { rw.RoleDataId, rw.MenuDataId });

        // 3. UserDataPermissionData Composite Key Mapping
        modelBuilder.Entity<UserDataPermissionData>()
            .HasKey(dp => new { dp.UserDataId, dp.LookUpId, dp.TypeNo });

        // 4. UserToStudentRelationData Composite Key Mapping
        modelBuilder.Entity<UserToStudentRelationData>()
            .HasKey(usr => new { usr.UserId, usr.StudentId });

        // Unique indexes for optimized performance
        modelBuilder.Entity<RoleData>()
            .HasIndex(o => o.RoleName).IsUnique();

        // Unique indexes for optimized performance
        modelBuilder.Entity<MenuData>()
            .HasIndex(o => new { o.MenuName,o.MenuParentId }).IsUnique();

        // Unique indexes for optimized performance
        modelBuilder.Entity<UserData>()
            .HasIndex(u => u.UserName).IsUnique();
    }
}