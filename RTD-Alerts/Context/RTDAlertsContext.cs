using Microsoft.EntityFrameworkCore;
using RTD_Alerts.Models;

namespace RTD_Alerts.Context
{
    public class RTDAlertsContext : DbContext
    {
        public RTDAlertsContext(DbContextOptions<RTDAlertsContext> options)
            : base(options)
        {
        }

        public DbSet<Keyword> Keywords { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TransitAuth> TransitAuths { get; set; }
        public DbSet<TweetHistory> TweetHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Keyword>().ToTable("Keywords");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<TransitAuth>().ToTable("Transit_Auth");
            modelBuilder.Entity<TweetHistory>().ToTable("Tweet_History");
        }
    }
}