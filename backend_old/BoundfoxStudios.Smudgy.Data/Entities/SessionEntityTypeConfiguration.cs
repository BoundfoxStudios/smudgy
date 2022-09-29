using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BoundfoxStudios.Smudgy.Data.Entities
{
  public class SessionEntityTypeConfiguration : BaseEntityTypeConfiguration<Session>
  {
    public override void Configure(EntityTypeBuilder<Session> builder)
    {
      base.Configure(builder);

      builder.HasMany(p => p.Rounds)
        .WithOne(p => p.Session)
        .HasForeignKey(p => p.SessionId)
        .HasPrincipalKey(p => p.Id)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(p => p.HostPlayer)
        .WithMany()
        .HasForeignKey(p => p.HostPlayerId)
        .HasPrincipalKey(p => p.Id);

      builder.HasMany(p => p.Players)
        .WithMany(p => p.Sessions)
        .UsingEntity<SessionPlayer>(
          j => j
            .HasOne(p => p.Player)
            .WithMany(p => p.SessionPlayers)
            .HasForeignKey(p => p.PlayerId)
            .HasPrincipalKey(p => p.Id)
            .OnDelete(DeleteBehavior.Cascade),
          j => j
            .HasOne(p => p.Session)
            .WithMany(p => p.SessionPlayers)
            .HasForeignKey(p => p.SessionId)
            .HasPrincipalKey(p => p.Id)
            .OnDelete(DeleteBehavior.Cascade),
          j => j.HasKey(p => new { p.PlayerId, p.SessionId })
        );
    }
  }
}