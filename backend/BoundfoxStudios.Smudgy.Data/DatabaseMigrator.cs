using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundfoxStudios.Smudgy.Data
{
  public class DatabaseMigrator
  {
    private readonly SmudgyContext _context;

    public DatabaseMigrator(SmudgyContext context)
    {
      _context = context;
    }

    public async Task MigrateAsync()
    {
      var migrator = _context.Database.GetService<IMigrator>();
      await migrator.MigrateAsync();
    }
  }
}
