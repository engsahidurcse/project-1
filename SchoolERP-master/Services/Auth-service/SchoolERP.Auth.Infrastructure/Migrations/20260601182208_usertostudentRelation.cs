using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolERP.Auth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class usertostudentRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "UserDatas");

            migrationBuilder.CreateTable(
                name: "UserToStudentRelationDatas",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserToStudentRelationDatas", x => new { x.UserId, x.StudentId });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserToStudentRelationDatas");

            migrationBuilder.AddColumn<long>(
                name: "StudentId",
                table: "UserDatas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
