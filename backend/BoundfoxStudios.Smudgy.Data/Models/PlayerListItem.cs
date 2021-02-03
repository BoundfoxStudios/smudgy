using System;

namespace BoundfoxStudios.Smudgy.Data.Models
{
  public class PlayerListItem : IPlayer
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
  }
}
