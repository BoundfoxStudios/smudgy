using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class PlayerEntityTypeConfiguration : BaseEntityTypeConfiguration<PlayerEntity>
  {
    protected override void ConfigureEntity(EntityTypeBuilder<PlayerEntity> builder)
    {
      builder.Property(p => p.Name).HasMaxLength(16);
    }
  }
}
