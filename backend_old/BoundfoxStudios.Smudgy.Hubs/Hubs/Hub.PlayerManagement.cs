using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Hubs.Hubs
{
  public partial class GameHub : Hub
  {
    [UsedImplicitly]
    public async Task<bool> Register(Guid id, string name)
    {
      _logger.LogInformation("[{ConnectionId}] Registering player {PlayerName} ({PlayerId})", Context.ConnectionId, name, id);

      if (id == Guid.Empty || string.IsNullOrWhiteSpace(name))
      {
        _logger.LogWarning("Missing id or name");
        return false;
      }

      await _playerService.RegisterPlayerAsync(id, name, Context.ConnectionId, Context.ConnectionAborted);

      return true;
    }

    public override Task OnConnectedAsync()
    {
      _logger.LogInformation("Socket connected: {ConnectionId}", Context.ConnectionId);

      return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      _logger.LogInformation("Socket disconnected: {ConnectionId}", Context.ConnectionId);

      await _playerService.PlayerDisconnectedAsync(Context.ConnectionId);

      await base.OnDisconnectedAsync(exception);
    }
  }
}
