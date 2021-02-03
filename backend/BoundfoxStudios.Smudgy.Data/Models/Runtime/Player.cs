using System;

namespace BoundfoxStudios.Smudgy.Data.Models.Runtime
{
  public class Player : IPlayer
  {
    public string SocketId { get; set; }
    public Guid Id { get; set; }
    public string Name { get; set; }
  }
}
