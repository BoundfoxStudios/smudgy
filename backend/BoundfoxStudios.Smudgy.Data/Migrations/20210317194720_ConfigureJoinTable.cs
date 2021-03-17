using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundfoxStudios.Smudgy.Data.Migrations
{
    public partial class ConfigureJoinTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerSession");

            migrationBuilder.CreateTable(
                name: "SessionPlayer",
                columns: table => new
                {
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PlayerId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionPlayer", x => new { x.PlayerId, x.SessionId });
                    table.ForeignKey(
                        name: "FK_SessionPlayer_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionPlayer_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionPlayer_SessionId",
                table: "SessionPlayer",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SessionPlayer");

            migrationBuilder.CreateTable(
                name: "PlayerSession",
                columns: table => new
                {
                    PlayersClusterId = table.Column<int>(type: "INTEGER", nullable: false),
                    SessionsClusterId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerSession", x => new { x.PlayersClusterId, x.SessionsClusterId });
                    table.ForeignKey(
                        name: "FK_PlayerSession_Players_PlayersClusterId",
                        column: x => x.PlayersClusterId,
                        principalTable: "Players",
                        principalColumn: "ClusterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerSession_Sessions_SessionsClusterId",
                        column: x => x.SessionsClusterId,
                        principalTable: "Sessions",
                        principalColumn: "ClusterId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerSession_SessionsClusterId",
                table: "PlayerSession",
                column: "SessionsClusterId");
        }
    }
}
