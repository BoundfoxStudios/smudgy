using System.Text.Json.Serialization;
using BoundfoxStudios.Smudgy.Hubs.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace BoundfoxStudios.Smudgy.Hubs.Extensions
{
  public static class ServiceProviderExtensions
  {
    public static IServiceCollection AddSmudgyHubs(this IServiceCollection services)
    {
      services.AddSignalR()
        .AddJsonProtocol(configure => configure.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

      services.AddSingleton(provider => provider.GetRequiredService<IHubContext<GameHub>>().Clients);
      services.AddSingleton(provider => provider.GetRequiredService<IHubContext<GameHub>>().Groups);

      return services;
    }

    public static void UseSmudgyHubs(this IApplicationBuilder app)
    {
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapHub<GameHub>("/hubs/game");
      });
    }
  }
}
