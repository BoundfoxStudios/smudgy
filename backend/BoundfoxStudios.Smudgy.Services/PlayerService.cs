using System;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using BoundfoxStudios.Smudgy.Data.Models;
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

    public async Task<bool> RegisterPlayerAsync(Guid id, string name, string connectionId, CancellationToken cancellationToken = default)
    {
      var existingPlayer = await _context.Players.SingleOrDefaultAsync(player => player.Id == id, cancellationToken);

      if (existingPlayer != null)
      {
        _logger.LogInformation("Player {PlayerName} ({PlayerId}) already exists", name, id);

        existingPlayer.SocketId = connectionId;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
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

      return true;
    }
  }
}
