using Microsoft.EntityFrameworkCore;
using api.Model;

namespace api.Persistence.DatabaseContext 
{
    public class PostgresContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ContestParticipant> ContestParticipants { get; set; }
        public DbSet<SerialNumber> SerialNumbers { get; set; }

        public PostgresContext(DbContextOptions options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContestParticipant>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
