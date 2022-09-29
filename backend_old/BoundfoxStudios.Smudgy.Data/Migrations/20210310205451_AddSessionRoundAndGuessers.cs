using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundfoxStudios.Smudgy.Data.Migrations
{
    public partial class AddSessionRoundAndGuessers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SessionRound",
                columns: table => new
                {
                    ClusterId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    DrawerPlayerClusterId = table.Column<int>(type: "INTEGER", nullable: false),
                    DrawerPlayerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    WordToDraw = table.Column<string>(type: "TEXT", nullable: true),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionRound", x => x.ClusterId);
                    table.UniqueConstraint("AK_SessionRound_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionRound_Players_DrawerPlayerClusterId",
                        column: x => x.DrawerPlayerClusterId,
                        principalTable: "Players",
                        principalColumn: "ClusterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionRound_Session_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Session",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionRoundGuesser",
                columns: table => new
                {
                    ClusterId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    GuesserClusterId = table.Column<int>(type: "INTEGER", nullable: false),
                    GuesserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Points = table.Column<int>(type: "INTEGER", nullable: false),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionRoundGuesser", x => x.ClusterId);
                    table.UniqueConstraint("AK_SessionRoundGuesser_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionRoundGuesser_Players_GuesserClusterId",
                        column: x => x.GuesserClusterId,
                        principalTable: "Players",
                        principalColumn: "ClusterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionRoundGuesser_SessionRound_GuesserId",
                        column: x => x.GuesserId,
                        principalTable: "SessionRound",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionRound_DrawerPlayerClusterId",
                table: "SessionRound",
                column: "DrawerPlayerClusterId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionRound_SessionId",
                table: "SessionRound",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionRoundGuesser_GuesserClusterId",
                table: "SessionRoundGuesser",
                column: "GuesserClusterId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionRoundGuesser_GuesserId",
                table: "SessionRoundGuesser",
                column: "GuesserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SessionRoundGuesser");

            migrationBuilder.DropTable(
                name: "SessionRound");
        }
    }
}
