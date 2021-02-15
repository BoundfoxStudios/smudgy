using System;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data.Models;
using BoundfoxStudios.Smudgy.Data.Models.Runtime;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;

namespace BoundfoxStudios.Smudgy.Hubs.Hubs
{
  public partial class GameHub : Hub
  {
    [UsedImplicitly]
    public async Task<Guid> CreateSession(SessionConfiguration sessionConfiguration) => await _sessionService.CreateSessionAsync(sessionConfiguration, Context.ConnectionId);

    [UsedImplicitly]
    public async Task<SessionConfiguration> JoinSession(Guid sessionId) => await _sessionService.JoinSessionAsync(Context.ConnectionId, sessionId);

    [UsedImplicitly]
    public Task<PlayerListItem[]> PlayerList() => Task.FromResult(_sessionService.PlayerList(Context.ConnectionId));

    [UsedImplicitly]
    public async Task UpdateSessionConfiguration(SessionConfiguration configuration) => await _sessionService.UpdateSessionConfigurationAsync(Context.ConnectionId, configuration);
  }
}
