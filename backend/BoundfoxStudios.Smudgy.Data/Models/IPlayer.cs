using System;

namespace BoundfoxStudios.Smudgy.Data.Models
{
  public interface IPlayer
  {
    Guid Id { get; set; }
    string Name { get; set; }
  }
}
