using BoundfoxStudios.Smudgy.Data.Extensions;
using BoundfoxStudios.Smudgy.Hubs.Extensions;
using BoundfoxStudios.Smudgy.Services.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BoundfoxStudios.Smudgy.Host
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();

      services
        .AddSmudgyData()
        .AddSmudgyServices()
        .AddSmudgyHubs();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseCors(corsBuilder => corsBuilder
          .AllowCredentials()
          .AllowAnyHeader()
          .AllowAnyMethod()
          .WithOrigins("http://localhost:4200", "https://smudgy-web.herokuapp.com") // TODO: Move this to configuration
      );

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      if (env.IsProduction())
      {
        app.UseHttpsRedirection();
      }

      app.UseRouting();

      app.UseAuthorization();

      app.UseSmudgyHubs();
    }
  }
}
