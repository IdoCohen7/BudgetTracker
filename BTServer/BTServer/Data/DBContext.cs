using Microsoft.EntityFrameworkCore;
using BTServer.Models;
using BTServer.Data.Configurations;

namespace BTServer.Data
{
    public class DBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        public DBContext(DbContextOptions options) : base(options) { }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new ExpenseConfiguration());    

            base.OnModelCreating(modelBuilder);
        }

    }
}
