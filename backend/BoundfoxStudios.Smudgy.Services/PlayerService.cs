using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using BoundfoxStudios.Smudgy.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Services
{
  public class PlayerService
  {
    private readonly ILogger<PlayerService> _logger;
    private readonly SmudgyContext _context;

    public PlayerService(ILogger<PlayerService> logger, SmudgyContext context)
    {
      _logger = logger;
      _context = context;
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

      var sessions = await _context.Sessions.Where(p => p.HostPlayerId == player.Id).ToListAsync(cancellationToken);
      _context.Sessions.RemoveRange(sessions);

      await _context.SaveChangesAsync(cancellationToken);
    }
  }
}
