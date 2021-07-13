using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace BoundfoxStudios.Smudgy.Host
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      Log.Logger = new LoggerConfiguration()
        .WriteTo.Console(theme: AnsiConsoleTheme.Code,
          outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext:l} {Message:lj}{NewLine}{Exception}")
        .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day,
          outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} {Level:u3}] {SourceContext:l} {Message:lj}{NewLine}{Exception}")
        .Enrich.FromLogContext()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
        .CreateLogger();

      try
      {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
          var migrator = scope.ServiceProvider.GetRequiredService<DatabaseMigrator>();
          await migrator.MigrateAsync();
        }

        await host.RunAsync();
      }
      finally
      {
        Log.CloseAndFlush();
      }
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
      Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
        .UseSerilog()
        .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
  }
}