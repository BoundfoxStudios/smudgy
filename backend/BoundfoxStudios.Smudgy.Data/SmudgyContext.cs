using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BoundfoxStudios.Smudgy.Data
{
  public class SmudgyContext : DbContext
  {
    public DbSet<PlayerEntity> Players { get; set; }

    public SmudgyContext(DbContextOptions<SmudgyContext> options)
      : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override int SaveChanges()
    {
      throw new NotSupportedException("Synchronous usage of SaveChanges is not supported.");
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
      throw new NotSupportedException("Synchronous usage of SaveChanges is not supported.");
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
      ApplyTimestamps();
      return await base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyTimestamps()
    {
      var entityEntries = ChangeTracker.Entries()
        .Where(entityEntry => entityEntry.Entity is BaseEntity)
        .Where(entityEntry => entityEntry.State == EntityState.Added || entityEntry.State == EntityState.Modified);

      foreach (var entityEntry in entityEntries)
      {
        var baseEntity = (BaseEntity) entityEntry.Entity;

        if (entityEntry.State == EntityState.Added)
        {
          baseEntity.CreatedAt = DateTime.UtcNow;
        }

        baseEntity.UpdatedAt = DateTime.UtcNow;
      }
    }
  }
}
