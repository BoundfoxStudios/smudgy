using System;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Services;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Hubs.Hubs
{
  public class PlayerHub : Hub
  {
    private readonly ILogger<PlayerHub> _logger;
    private readonly PlayerService _playerService;

    public PlayerHub(ILogger<PlayerHub> logger, PlayerService playerService)
    {
      _logger = logger;
      _playerService = playerService;
    }

    [UsedImplicitly]
    public async Task<bool> Register(Guid id, string name)
    {
      _logger.LogInformation("[{ConnectionId}] Registering player {PlayerName} ({PlayerId})", Context.ConnectionId, name, id);

      if (id == Guid.Empty || string.IsNullOrWhiteSpace(name))
      {
        _logger.LogWarning("Missing id or name.");
        return false;
      }

      return await _playerService.RegisterPlayerAsync(id, name, Context.ConnectionId, Context.ConnectionAborted);
    }

    public override Task OnConnectedAsync()
    {
      _logger.LogInformation("Socket connected: {ConnectionId}", Context.ConnectionId);

      return base.OnConnectedAsync();

    }
  }
}
