using System;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class SessionPlayer
  {
    public Guid SessionId { get; set; }
    public Session Session { get; set; }

    public Guid PlayerId { get; set; }
    public Player Player { get; set; }
  }
}
