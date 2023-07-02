using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace DAL.Data
{
    public class GroceryManagementDbContext : DbContext
    {
        public GroceryManagementDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Cart> MyCart { get; set; }
        public DbSet<MyOrder> MyOrders { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user");
        }
    }
}
