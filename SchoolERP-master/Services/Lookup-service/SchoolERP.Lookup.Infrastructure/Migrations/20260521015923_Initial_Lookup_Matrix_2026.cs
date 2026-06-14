using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolERP.Lookup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial_Lookup_Matrix_2026 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LookUpDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNo = table.Column<int>(type: "int", nullable: false),
                    LookUpCode = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    LookUpName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LookUpBDName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    LookUpSymbol = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: false),
                    DDLFirstId = table.Column<int>(type: "int", nullable: false),
                    LookUpTypeId = table.Column<int>(type: "int", nullable: false),
                    IsEntryForm = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookUpDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookUpTypeDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNo = table.Column<int>(type: "int", nullable: false),
                    LookUpTypeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PowerNumber = table.Column<int>(type: "int", nullable: false),
                    ChildYesNo = table.Column<int>(type: "int", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: false),
                    ParentGroupType = table.Column<int>(type: "int", nullable: false),
                    DDLParentId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookUpTypeDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Website = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LicensedUpto = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClosedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationDatas_OrganizationDatas_ParentId",
                        column: x => x.ParentId,
                        principalTable: "OrganizationDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "OrganizationWithTableRowDatas",
                columns: table => new
                {
                    TableNameId = table.Column<int>(type: "int", nullable: false),
                    TableRowId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    SerialNo = table.Column<int>(type: "int", nullable: false),
                    IsNeed = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationWithTableRowDatas", x => new { x.OrganizationId, x.TableNameId, x.TableRowId });
                    table.ForeignKey(
                        name: "FK_OrganizationWithTableRowDatas_OrganizationDatas_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "OrganizationDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationWithTableRowDatas_TableNameDatas_TableNameId",
                        column: x => x.TableNameId,
                        principalTable: "TableNameDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LookUpTypeDatas_LookUpTypeName_OrganizationId",
                table: "LookUpTypeDatas",
                columns: new[] { "LookUpTypeName", "OrganizationId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationDatas_ParentId",
                table: "OrganizationDatas",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationDatas_RegistrationNo_ParentId",
                table: "OrganizationDatas",
                columns: new[] { "RegistrationNo", "ParentId" },
                unique: true,
                filter: "[ParentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationWithTableRowDatas_TableNameId",
                table: "OrganizationWithTableRowDatas",
                column: "TableNameId");

            migrationBuilder.CreateIndex(
                name: "IX_TableNameDatas_DbName_TableName",
                table: "TableNameDatas",
                columns: new[] { "DbName", "TableName" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LookUpDatas");

            migrationBuilder.DropTable(
                name: "LookUpTypeDatas");

            migrationBuilder.DropTable(
                name: "OrganizationWithTableRowDatas");

            migrationBuilder.DropTable(
                name: "OrganizationDatas");

            migrationBuilder.DropTable(
                name: "TableNameDatas");
        }
    }
}
