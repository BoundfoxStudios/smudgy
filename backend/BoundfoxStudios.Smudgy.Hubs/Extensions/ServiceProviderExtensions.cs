using BoundfoxStudios.Smudgy.Hubs.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BoundfoxStudios.Smudgy.Hubs.Extensions
{
  public static class ServiceProviderExtensions
  {
    public static IServiceCollection AddSmudgyHubs(this IServiceCollection services)
    {
      services.AddSignalR();

      return services;
    }

    public static void UseSmudgyHubs(this IApplicationBuilder app)
    {
      app.UseEndpoints(endpoints => endpoints.MapHub<PlayerHub>("/hubs/player"));
    }
  }
}
