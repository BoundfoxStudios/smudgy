using System;
using System.Collections.Generic;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class Player : BaseEntity
  {
    public string Name { get; set; }
    public string? SocketId { get; set; }

    public ICollection<Session> Sessions { get; set; }
  }
}
