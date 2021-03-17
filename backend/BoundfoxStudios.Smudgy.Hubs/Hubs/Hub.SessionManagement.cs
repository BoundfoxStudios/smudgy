using System;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data.DTOs;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;

namespace BoundfoxStudios.Smudgy.Hubs.Hubs
{
  public partial class GameHub : Hub
  {
    [UsedImplicitly]
    public async Task<Guid> CreateSession(SessionConfiguration sessionConfiguration) => await _sessionService.CreateSessionAsync(sessionConfiguration, Context.ConnectionId, Context.ConnectionAborted);

    [UsedImplicitly]
    public async Task<SessionConfiguration> JoinSession(Guid sessionId) => await _sessionService.JoinSessionAsync(Context.ConnectionId, sessionId, Context.ConnectionAborted);

    [UsedImplicitly]
    public async Task<PlayerListItem[]> PlayerList(Guid sessionId) => await _sessionService.PlayerListAsync(sessionId, Context.ConnectionAborted);

    [UsedImplicitly]
    public async Task UpdateSessionConfiguration(Guid sessionId, SessionConfiguration configuration) => await _sessionService.UpdateSessionConfigurationAsync(sessionId, Context.ConnectionId, configuration, Context.ConnectionAborted);
  }
}
