using BoundfoxStudios.Smudgy.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace BoundfoxStudios.Smudgy.Hubs.Hubs
{
  public partial class GameHub : Hub
  {
    private readonly ILogger<GameHub> _logger;
    private readonly PlayerService _playerService;
    private readonly SessionService _sessionService;

    public GameHub(ILogger<GameHub> logger, PlayerService playerService, SessionService sessionService)
    {
      _logger = logger;
      _playerService = playerService;
      _sessionService = sessionService;
    }
  }
}
