using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolERP.Auth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_Auth_Matrix_2026 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationWiseMenuOrRuleDatas");

            migrationBuilder.DropTable(
                name: "TableNameDatas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrganizationWiseMenuOrRuleDatas",
                columns: table => new
                {
                    MenuOrRoleId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    SerialNo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationWiseMenuOrRuleDatas", x => new { x.MenuOrRoleId, x.TypeId, x.OrganizationId });
                });

            migrationBuilder.CreateTable(
                name: "TableNameDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Active = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DbName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    TableName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableNameDatas", x => x.Id);
                });
        }
    }
}
