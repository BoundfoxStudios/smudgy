using BoundfoxStudios.Smudgy.Data.Models;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class PlayerEntity : BaseEntity, IPlayer
  {
    public string Name { get; set; }
  }
}
