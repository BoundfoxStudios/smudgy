using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using BoundfoxStudios.Smudgy.Data.DTOs;
using BoundfoxStudios.Smudgy.Data.Entities;
using BoundfoxStudios.Smudgy.Data.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Services
{
  public class SessionService
  {
    private readonly IGroupManager _groupManager;
    private readonly ILogger<SessionService> _logger;
    private readonly SmudgyContext _context;
    private readonly IHubClients _clients;

    public SessionService(
      IGroupManager groupManager,
      IHubClients clients,
      ILogger<SessionService> logger,
      SmudgyContext context
    )
    {
      _groupManager = groupManager;
      _logger = logger;
      _context = context;
      _clients = clients;
    }

    public async Task<Guid> CreateSessionAsync(SessionConfiguration configuration, string hostPlayerConnectionId,
      CancellationToken cancellationToken = default)
    {
      _logger.LogInformation("Creating new session for {PlayerId}", hostPlayerConnectionId);

      var hostPlayer = await _context.Players.SingleOrDefaultAsync(p => p.SocketId == hostPlayerConnectionId, cancellationToken);

      if (hostPlayer == null)
      {
        // TODO: Error handling
        throw new Exception("host player not found");
      }

      var session = new Session()
      {
        Id = Guid.NewGuid(),
        HostPlayerId = hostPlayer.Id,
        Language = configuration.Language,
        State = SessionState.Lobby,
        MaxPlayers = configuration.MaxPlayers,
        RoundsToPlay = configuration.RoundsToPlay,
        RoundTimeInSeconds = configuration.RoundTimeInSeconds
      };

      await _context.Sessions.AddAsync(session, cancellationToken);
      await _context.SaveChangesAsync(cancellationToken);

      _logger.LogInformation("Created new session {id} for {PlayerId}", session.Id, hostPlayerConnectionId);

      return session.Id;
    }

    public async Task<SessionConfiguration> JoinSessionAsync(string playerId, Guid sessionId, CancellationToken cancellationToken = default)
    {
      _logger.LogInformation("Player {Player} wants to join session {Session}", playerId, sessionId);

      var session = await _context.Sessions.Include(p => p.Players).SingleOrDefaultAsync(p => p.Id == sessionId, cancellationToken);
      var player = await _context.Players.SingleOrDefaultAsync(p => p.SocketId == playerId, cancellationToken);

      if (session == null || player == null)
      {
        _logger.LogInformation("Player {Player} can not join session {Session}, either player or session was not found", playerId,
          sessionId);
        return null;
      }

      if (session.Players.All(p => p.Id != player.Id))
      {
        session.Players.Add(player);
        await _context.SaveChangesAsync(cancellationToken);
      }

      await _groupManager.AddToGroupAsync(playerId, session.Id.ToString(), cancellationToken);
      await _clients.Group(session.Id.ToString()).SendAsync("playerJoinSession",
        new PlayerListItem() { Id = player.Id, Name = player.Name }, cancellationToken);

      return new SessionConfiguration()
      {
        RoundsToPlay = session.RoundsToPlay,
        Language = session.Language,
        MaxPlayers = session.MaxPlayers,
        RoundTimeInSeconds = session.RoundTimeInSeconds
      };
    }

    public async Task<PlayerListItem[]> PlayerListAsync(Guid sessionId, CancellationToken cancellationToken = default)
    {
      return await _context.Sessions.Where(p => p.Id == sessionId).SelectMany(p => p.Players)
        .Select(p => new PlayerListItem() { Id = p.Id, Name = p.Name })
        .ToArrayAsync(cancellationToken);
    }

    public async Task UpdateSessionConfigurationAsync(Guid sessionId, string playerId, SessionConfiguration sessionConfiguration,
      CancellationToken cancellationToken = default)
    {
      _logger.LogInformation("Receiving new session configuration from {Player} for {Session}: {@SessionConfiguration}", playerId,
        sessionId,
        sessionConfiguration);

      var player = await _context.Players.SingleOrDefaultAsync(p => p.SocketId == playerId, cancellationToken);
      var session = await _context.Sessions.SingleOrDefaultAsync(p => p.HostPlayerId == player.Id && p.Id == sessionId, cancellationToken);

      if (session == null)
      {
        _logger.LogWarning("Session {Session} not found for player {Player}", sessionId, player.Id);
        return;
      }

      session.Language = sessionConfiguration.Language;
      session.RoundsToPlay = sessionConfiguration.RoundsToPlay;
      session.RoundTimeInSeconds = sessionConfiguration.RoundTimeInSeconds;
      session.MaxPlayers = sessionConfiguration.MaxPlayers;

      await _context.SaveChangesAsync(cancellationToken);

      await _clients.Group(sessionId.ToString()).SendAsync("updateSessionConfiguration", new SessionConfiguration()
      {
        Language = session.Language,
        MaxPlayers = session.MaxPlayers,
        RoundsToPlay = session.RoundsToPlay,
        RoundTimeInSeconds = session.RoundTimeInSeconds
      }, cancellationToken);
    }

    public async Task<bool> StartGameAsync(Guid sessionId, string playerId, CancellationToken cancellationToken)
    {
      _logger.LogInformation("Receiving start game request from {Player} for {Session}.", playerId, sessionId);

      var player = await _context.Players.SingleOrDefaultAsync(p => p.SocketId == playerId, cancellationToken);
      var session = await _context.Sessions.SingleOrDefaultAsync(p => p.HostPlayerId == player.Id && p.Id == sessionId, cancellationToken);

      if (session == null)
      {
        _logger.LogWarning("Session {Session} not found for player {Player}", sessionId, player.Id);
        return false;
      }

      if (session.State != SessionState.Lobby)
      {
        _logger.LogWarning("Session {Session} is not in state lobby, but {State}. Can not start anymore.", sessionId, session.State);
        return false;
      }

      session.State = SessionState.InGame;

      await _context.SaveChangesAsync(cancellationToken);

      await _clients.Group(sessionId.ToString()).SendAsync("startGame", cancellationToken);

      return true;
    }
  }
}
