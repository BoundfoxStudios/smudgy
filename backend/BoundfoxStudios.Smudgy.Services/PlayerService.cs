using System;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using BoundfoxStudios.Smudgy.Data.Entities;
using BoundfoxStudios.Smudgy.Data.Models.Runtime;
using BoundfoxStudios.Smudgy.Data.RuntimeCaches;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Services
{
  public class PlayerService
  {
    private readonly ILogger<PlayerService> _logger;
    private readonly SmudgyContext _context;
    private readonly IPlayerCache _playerCache;

    public PlayerService(ILogger<PlayerService> logger, SmudgyContext context, IPlayerCache playerCache)
    {
      _logger = logger;
      _context = context;
      _playerCache = playerCache;
    }

    public async Task RegisterPlayerAsync(Guid id, string name, string connectionId, CancellationToken cancellationToken = default)
    {
      var existingPlayer = await _context.Players.SingleOrDefaultAsync(player => player.Id == id, cancellationToken);

      _playerCache.Set(id, new Player() { Id = id, Name = name, SocketId = connectionId });

      if (existingPlayer != null)
      {
        _logger.LogInformation("Player {PlayerName} ({PlayerId}) already exists in the database", name, id);
        return;
      }

      existingPlayer = new PlayerEntity()
      {
        Id = id,
        Name = name
      };

      await _context.AddAsync(existingPlayer, cancellationToken);
      await _context.SaveChangesAsync(cancellationToken);

      _logger.LogInformation("Registered new player {@Player}", existingPlayer);
    }

    public void PlayerDisconnected(string connectionId)
    {
      var player = _playerCache.GetByConnectionId(connectionId);

      if (player == null)
      {
        return;
      }

      _playerCache.Remove(player.Id);
    }
  }
}
