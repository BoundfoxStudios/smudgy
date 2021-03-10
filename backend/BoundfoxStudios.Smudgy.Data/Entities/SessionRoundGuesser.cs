using System;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class SessionRoundGuesser : BaseEntity
  {
    public SessionRound Round { get; set; }
    public Guid RoundId { get; set; }

    public Player Guesser { get; set; }
    public Guid GuesserId { get; set; }

    public int Points { get; set; }
  }
}
