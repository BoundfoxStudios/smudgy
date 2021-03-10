using System;
using System.Collections.Generic;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class SessionRound : BaseEntity
  {
    public Session Session { get; set; }
    public Guid SessionId { get; set; }

    public Player DrawerPlayer { get; set; }
    public Guid DrawerPlayerId { get; set; }

    public string WordToDraw { get; set; }

    public ICollection<SessionRoundGuesser> Guessers { get; set; }
  }
}
