using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class PlayerEntityTypeConfiguration : BaseEntityTypeConfiguration<Player>
  {
    public override void Configure(EntityTypeBuilder<Player> builder)
    {
      base.Configure(builder);

      builder.Property(p => p.Name).HasMaxLength(16);
      builder.HasIndex(p => p.SocketId).IsUnique();
    }
  }
}
