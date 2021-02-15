using Microsoft.Extensions.DependencyInjection;

namespace BoundfoxStudios.Smudgy.Services.Extensions
{
  public static class ServiceProviderExtensions
  {
    public static IServiceCollection AddSmudgyServices(this IServiceCollection services)
    {
      services.AddTransient<PlayerService>();
      services.AddTransient<SessionService>();

      return services;
    }
  }
}
