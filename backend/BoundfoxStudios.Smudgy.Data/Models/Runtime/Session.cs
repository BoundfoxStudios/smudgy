using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace BoundfoxStudios.Smudgy.Data.Models.Runtime
{
  public record Session
  {
    public Guid Id { get; set; }
    public Guid HostPlayerId { get; set; }
    public SessionConfiguration Configuration { get; set; }
    public SessionState State { get; set; }
    public ICollection<SessionRound> Rounds { get; } = new Collection<SessionRound>();
    public IDictionary<Guid, SessionPlayerInformation> Players { get; } = new Dictionary<Guid, SessionPlayerInformation>();
  }

  public record SessionPlayerInformation
  {
    public int Points { get; set; }
  }

  public record SessionRound
  {
    public Guid DrawerPlayerId { get; set; }
    public string WordToDraw { get; set; }
    public ICollection<Guid> CorrectGuesserPlayerIds { get; } = new Collection<Guid>();
  }

  public enum SessionLanguage
  {
    German,
    English,
  }

  public enum SessionState
  {
    Lobby
  }

  public record SessionConfiguration
  {
    public SessionLanguage Language { get; set; }
    public int RoundTimeInSeconds { get; set; }
    public int RoundsToPlay { get; set; }
    public int MaxPlayers { get; set; }
  }
}
