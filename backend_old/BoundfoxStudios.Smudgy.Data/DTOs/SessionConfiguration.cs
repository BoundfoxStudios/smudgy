using BoundfoxStudios.Smudgy.Data.Models;

namespace BoundfoxStudios.Smudgy.Data.DTOs
{
  public class SessionConfiguration
  {
    public SessionLanguage Language { get; set; }
    public int RoundTimeInSeconds { get; set; }
    public int RoundsToPlay { get; set; }
    public int MaxPlayers { get; set; }
  }
}
