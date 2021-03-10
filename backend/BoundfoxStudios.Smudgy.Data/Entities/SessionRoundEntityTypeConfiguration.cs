using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class SessionRoundEntityTypeConfiguration : BaseEntityTypeConfiguration<SessionRound>
  {
    public override void Configure(EntityTypeBuilder<SessionRound> builder)
    {
      base.Configure(builder);

      builder.HasMany(p => p.Guessers)
        .WithOne(p => p.Round)
        .HasForeignKey(p => p.GuesserId)
        .HasPrincipalKey(p => p.Id);
    }
  }
}
