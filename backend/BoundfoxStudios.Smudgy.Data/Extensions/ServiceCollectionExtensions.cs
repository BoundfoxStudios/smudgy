using BoundfoxStudios.Smudgy.Data.RuntimeCaches;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BoundfoxStudios.Smudgy.Data.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddSmudgyData(this IServiceCollection services)
    {
      services.AddDbContext<SmudgyContext>(options => options.UseSqlite("Data Source=smudgy.db")); // TODO: configuration
      services.AddTransient<DatabaseMigrator>();

      services.AddMemoryCache();
      services.AddTransient<IPlayerCache, PlayerCache>();
      services.AddTransient<ISessionCache, SessionCache>();

      return services;
    }
  }
}
