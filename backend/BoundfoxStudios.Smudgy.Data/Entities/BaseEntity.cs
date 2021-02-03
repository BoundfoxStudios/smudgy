using System;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public abstract class BaseEntity
  {
    private int ClusterId { get; set; }
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
  }
}
