using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolERP.Auth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init_Auth_System : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MenuBanglaName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RouteName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MenuURL = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MenuTitle = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    MenuIcon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SerialNo = table.Column<int>(type: "int", nullable: false),
                    MenuParentId = table.Column<int>(type: "int", nullable: false),
                    CanEdit = table.Column<int>(type: "int", nullable: false),
                    CanDelete = table.Column<int>(type: "int", nullable: false),
                    CanInsert = table.Column<int>(type: "int", nullable: false),
                    CanView = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationWiseMenuOrRuleDatas",
                columns: table => new
                {
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    MenuOrRoleId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    SerialNo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationWiseMenuOrRuleDatas", x => new { x.MenuOrRoleId, x.TypeId, x.OrganizationId });
                });

            migrationBuilder.CreateTable(
                name: "RoleDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TableNameDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DbName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    TableName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableNameDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserDatas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    UserPhoto = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UserMobileNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UserEmail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UserAddress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserRoleId = table.Column<int>(type: "int", nullable: false),
                    UserTypeId = table.Column<int>(type: "int", nullable: false),
                    UserGenderId = table.Column<int>(type: "int", nullable: false),
                    UserReligionId = table.Column<int>(type: "int", nullable: false),
                    UserBloodGroupId = table.Column<int>(type: "int", nullable: false),
                    UserMaritalStatusId = table.Column<int>(type: "int", nullable: false),
                    UserNationality = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserTransactionLogDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    TableId = table.Column<int>(type: "int", nullable: false),
                    TransactionLog = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MacAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    OSName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IPAddress = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    ComputerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTransactionLogDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserMenuPermissionDatas",
                columns: table => new
                {
                    UserDataId = table.Column<long>(type: "bigint", nullable: false),
                    MenuDataId = table.Column<int>(type: "int", nullable: false),
                    CanEdit = table.Column<int>(type: "int", nullable: false),
                    CanDelete = table.Column<int>(type: "int", nullable: false),
                    CanInsert = table.Column<int>(type: "int", nullable: false),
                    CanView = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMenuPermissionDatas", x => new { x.UserDataId, x.MenuDataId });
                    table.ForeignKey(
                        name: "FK_UserMenuPermissionDatas_MenuDatas_MenuDataId",
                        column: x => x.MenuDataId,
                        principalTable: "MenuDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolesWiseMenuAssignDatas",
                columns: table => new
                {
                    MenuDataId = table.Column<int>(type: "int", nullable: false),
                    RoleDataId = table.Column<int>(type: "int", nullable: false),
                    CanEdit = table.Column<int>(type: "int", nullable: false),
                    CanDelete = table.Column<int>(type: "int", nullable: false),
                    CanInsert = table.Column<int>(type: "int", nullable: false),
                    CanView = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesWiseMenuAssignDatas", x => new { x.RoleDataId, x.MenuDataId });
                    table.ForeignKey(
                        name: "FK_RolesWiseMenuAssignDatas_RoleDatas_RoleDataId",
                        column: x => x.RoleDataId,
                        principalTable: "RoleDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserDataPermissionDatas",
                columns: table => new
                {
                    UserDataId = table.Column<long>(type: "bigint", nullable: false),
                    TypeNo = table.Column<int>(type: "int", nullable: false),
                    LookUpId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDataPermissionDatas", x => new { x.UserDataId, x.LookUpId, x.TypeNo });
                    table.ForeignKey(
                        name: "FK_UserDataPermissionDatas_UserDatas_UserDataId",
                        column: x => x.UserDataId,
                        principalTable: "UserDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MenuDatas_MenuName_MenuParentId",
                table: "MenuDatas",
                columns: new[] { "MenuName", "MenuParentId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoleDatas_RoleName",
                table: "RoleDatas",
                column: "RoleName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDatas_UserName",
                table: "UserDatas",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserMenuPermissionDatas_MenuDataId",
                table: "UserMenuPermissionDatas",
                column: "MenuDataId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationWiseMenuOrRuleDatas");

            migrationBuilder.DropTable(
                name: "RolesWiseMenuAssignDatas");

            migrationBuilder.DropTable(
                name: "TableNameDatas");

            migrationBuilder.DropTable(
                name: "UserDataPermissionDatas");

            migrationBuilder.DropTable(
                name: "UserMenuPermissionDatas");

            migrationBuilder.DropTable(
                name: "UserTransactionLogDatas");

            migrationBuilder.DropTable(
                name: "RoleDatas");

            migrationBuilder.DropTable(
                name: "UserDatas");

            migrationBuilder.DropTable(
                name: "MenuDatas");
        }
    }
}
