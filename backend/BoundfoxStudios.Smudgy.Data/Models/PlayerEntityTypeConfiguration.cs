using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Models
{
  public class PlayerEntityTypeConfiguration : BaseEntityTypeConfiguration<Player>
  {
    protected override void ConfigureEntity(EntityTypeBuilder<Player> builder)
    {
      builder.Property(p => p.Name).HasMaxLength(16);
    }
  }
}
