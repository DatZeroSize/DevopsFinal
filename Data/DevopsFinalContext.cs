using Microsoft.EntityFrameworkCore;
using DevopsFinal.Models;
namespace DevopsFinal.Data
{
    public class DevopsFinalContext : DbContext
    {
        public DevopsFinalContext(DbContextOptions<DevopsFinalContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
