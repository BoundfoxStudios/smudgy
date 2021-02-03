using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data.Models;
using BoundfoxStudios.Smudgy.Data.Models.Runtime;
using BoundfoxStudios.Smudgy.Data.RuntimeCaches;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Services
{
  public class SessionService
  {
    private readonly IGroupManager _groupManager;
    private readonly ILogger<SessionService> _logger;
    private readonly ISessionCache _sessionCache;
    private readonly IPlayerCache _playerCache;
    private readonly IHubClients _clients;

    public SessionService(
      IGroupManager groupManager,
      IHubClients clients,
      ILogger<SessionService> logger,
      ISessionCache sessionCache,
      IPlayerCache playerCache
    )
    {
      _groupManager = groupManager;
      _logger = logger;
      _sessionCache = sessionCache;
      _playerCache = playerCache;
      _clients = clients;
    }

    public async Task<Guid> CreateSessionAsync(SessionConfiguration configuration, string hostPlayerId)
    {
      _logger.LogInformation("Creating new session for {PlayerId}", hostPlayerId);

      var hostPlayer = _playerCache.GetByConnectionId(hostPlayerId);

      var session = new Session()
      {
        Id = Guid.NewGuid(),
        HostPlayerId = hostPlayer.Id,
        Configuration = configuration,
        State = SessionState.Lobby,
      };

      _sessionCache.Set(session.Id, session);

      await JoinSessionAsync(hostPlayerId, session.Id);

      return session.Id;
    }

    public async Task<SessionConfiguration> JoinSessionAsync(string playerId, Guid sessionId)
    {
      _logger.LogInformation("Player {Player} wants to join session {Session}", playerId, sessionId);

      var session = _sessionCache.Get(sessionId);
      var player = _playerCache.GetByConnectionId(playerId);

      if (session == null || player == null)
      {
        _logger.LogInformation("Player {Player} can not join session {Session}, either player or session was not found", playerId,
          sessionId);
        return null;
      }

      await _groupManager.AddToGroupAsync(playerId, session.Id.ToString());

      session.Players.TryAdd(player.Id, new SessionPlayerInformation());

      await _clients.Group(session.Id.ToString()).SendAsync("playerJoinSession", player);

      return session.Configuration;
    }

    public PlayerListItem[] PlayerList(string playerId)
    {
      var player = _playerCache.GetByConnectionId(playerId);

      if (player == null)
      {
        return new PlayerListItem[0];
      }

      var session = _sessionCache.GetByHostPlayerId(player.Id);

      if (session == null)
      {
        return new PlayerListItem[0];
      }

      return session.Players.Select(p => new PlayerListItem()
      {
        Id = p.Key,
        Name = _playerCache.Get(p.Key).Name
      }).ToArray();
    }

    public async Task UpdateSessionConfigurationAsync(string playerId, SessionConfiguration sessionConfiguration)
    {
      _logger.LogInformation("Receiving new session configuration from {Player} for {Session}: {@SessionConfiguration}", playerId, playerId,
        sessionConfiguration);

      var player = _playerCache.GetByConnectionId(playerId);
      var session = _sessionCache.GetByHostPlayerId(player.Id);

      if (session == null)
      {
        _logger.LogInformation("Can not set session configuration. It was not send by the host");
        return;
      }

      session.Configuration = sessionConfiguration;

      await _clients.Group(session.Id.ToString()).SendAsync("updateSessionConfiguration", sessionConfiguration);
    }
  }
}
