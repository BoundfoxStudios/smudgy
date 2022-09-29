using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using BoundfoxStudios.Smudgy.Data.DTOs;
using BoundfoxStudios.Smudgy.Data.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Services
{
  public class PlayerService
  {
    private readonly ILogger<PlayerService> _logger;
    private readonly SmudgyContext _context;
    private readonly IHubClients _clients;
    private readonly IGroupManager _groupManager;

    public PlayerService(ILogger<PlayerService> logger, SmudgyContext context, IHubClients clients, IGroupManager groupManager)
    {
      _logger = logger;
      _context = context;
      _clients = clients;
      _groupManager = groupManager;
    }

    public async Task RegisterPlayerAsync(Guid id, string name, string connectionId, CancellationToken cancellationToken = default)
    {
      var existingPlayer = await _context.Players.SingleOrDefaultAsync(player => player.Id == id, cancellationToken);

      if (existingPlayer != null)
      {
        _logger.LogInformation("Player {PlayerName} ({PlayerId}) already exists in the database, updating SocketId", name, id);

        existingPlayer.SocketId = connectionId;
        await _context.SaveChangesAsync(cancellationToken);

        return;
      }

      existingPlayer = new Player()
      {
        Id = id,
        Name = name,
        SocketId = connectionId
      };

      await _context.AddAsync(existingPlayer, cancellationToken);
      await _context.SaveChangesAsync(cancellationToken);

      _logger.LogInformation("Registered new player {@Player}", existingPlayer);
    }

    public async Task PlayerDisconnectedAsync(string connectionId, CancellationToken cancellationToken = default)
    {
      var player = await _context.Players.SingleOrDefaultAsync(p => p.SocketId == connectionId, cancellationToken);

      if (player == null)
      {
        return;
      }

      player.SocketId = null;

      var hostSessions = await _context.Sessions.Where(p => p.HostPlayerId == player.Id).ToListAsync(cancellationToken);
      _context.Sessions.RemoveRange(hostSessions);

      var playerSessions = await _context.Sessions
        .Include(p => p.Players)
        .Where(session => session.Players.Any(sessionPlayer => sessionPlayer.Id == player.Id))
        .ToListAsync(cancellationToken);

      foreach (var session in playerSessions)
      {
        var sessionPlayer = session.Players.Single(p => p.Id == player.Id);
        session.Players.Remove(sessionPlayer);

        await _clients.Group(session.Id.ToString()).SendAsync("playerLeaveSession",
          new PlayerListItem() { Id = player.Id, Name = player.Name }, cancellationToken);
      }

      await _context.SaveChangesAsync(cancellationToken);
    }
  }
}
