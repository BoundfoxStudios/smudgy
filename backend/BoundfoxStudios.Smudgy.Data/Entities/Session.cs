using System;
using System.Collections.Generic;
using BoundfoxStudios.Smudgy.Data.Models;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class Session : BaseEntity
  {
    public Player HostPlayer { get; set; }
    public Guid HostPlayerId { get; set; }
    public SessionLanguage Language { get; set; }
    public int RoundTimeInSeconds { get; set; }
    public int RoundsToPlay { get; set; }
    public int MaxPlayers { get; set; }
    public SessionState State { get; set; }

    public ICollection<SessionRound> Rounds { get; set; }
    public ICollection<Player> Players { get; set; }
  }
}
