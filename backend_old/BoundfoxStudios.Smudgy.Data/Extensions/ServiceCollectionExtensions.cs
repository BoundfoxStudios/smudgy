using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BoundfoxStudios.Smudgy.Data.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddSmudgyData(this IServiceCollection services)
    {
      services.AddDbContext<SmudgyContext>(options =>
        options.UseSqlite("Data Source=smudgy.db")
          .EnableSensitiveDataLogging()
      ); // TODO: configuration
      services.AddTransient<DatabaseMigrator>();

      return services;
    }
  }
}
