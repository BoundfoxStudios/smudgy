using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundfoxStudios.Smudgy.Data.Migrations
{
    public partial class SessionPlayers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Session_Players_HostPlayerId",
                table: "Session");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionRound_Session_SessionId",
                table: "SessionRound");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Session_Id",
                table: "Session");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Session",
                table: "Session");

            migrationBuilder.RenameTable(
                name: "Session",
                newName: "Sessions");

            migrationBuilder.RenameIndex(
                name: "IX_Session_HostPlayerId",
                table: "Sessions",
                newName: "IX_Sessions_HostPlayerId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Sessions_Id",
                table: "Sessions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions",
                column: "ClusterId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_SessionRound_Sessions_SessionId",
                table: "SessionRound",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Players_HostPlayerId",
                table: "Sessions",
                column: "HostPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionRound_Sessions_SessionId",
                table: "SessionRound");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Players_HostPlayerId",
                table: "Sessions");

            migrationBuilder.DropTable(
                name: "PlayerSession");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Sessions_Id",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions");

            migrationBuilder.RenameTable(
                name: "Sessions",
                newName: "Session");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_HostPlayerId",
                table: "Session",
                newName: "IX_Session_HostPlayerId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Session_Id",
                table: "Session",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Session",
                table: "Session",
                column: "ClusterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Session_Players_HostPlayerId",
                table: "Session",
                column: "HostPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionRound_Session_SessionId",
                table: "SessionRound",
                column: "SessionId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
