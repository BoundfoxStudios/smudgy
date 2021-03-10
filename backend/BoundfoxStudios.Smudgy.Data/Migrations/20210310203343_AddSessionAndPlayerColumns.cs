using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundfoxStudios.Smudgy.Data.Migrations
{
    public partial class AddSessionAndPlayerColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Session",
                columns: table => new
                {
                    ClusterId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HostPlayerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Language = table.Column<int>(type: "INTEGER", nullable: false),
                    RoundTimeInSeconds = table.Column<int>(type: "INTEGER", nullable: false),
                    RoundsToPlay = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPlayers = table.Column<int>(type: "INTEGER", nullable: false),
                    State = table.Column<int>(type: "INTEGER", nullable: false),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.ClusterId);
                    table.UniqueConstraint("AK_Session_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Session_Players_HostPlayerId",
                        column: x => x.HostPlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_SocketId",
                table: "Players",
                column: "SocketId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Session_HostPlayerId",
                table: "Session",
                column: "HostPlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Session");

            migrationBuilder.DropIndex(
                name: "IX_Players_SocketId",
                table: "Players");
        }
    }
}
