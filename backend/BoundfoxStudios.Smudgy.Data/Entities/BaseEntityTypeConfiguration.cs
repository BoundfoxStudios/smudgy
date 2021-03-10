using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public abstract class BaseEntityTypeConfiguration<T> : IEntityTypeConfiguration<T>
    where T : BaseEntity
  {
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
      builder.HasKey("ClusterId");
      builder.HasAlternateKey(p => p.Id);
    }
  }
}
