using DAL.Data;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryBackend.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly GroceryManagementDbContext _dbContext;

        public CartRepository(GroceryManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Cart> GetById(Guid id)
        {
            return _dbContext.MyCart.FirstOrDefaultAsync(c => c.Id == id);
        }

        public Task<Cart> GetByUserIdAndProductId(string userId, Guid productId)
        {
            return _dbContext.MyCart.FirstOrDefaultAsync(c => c.userId == userId && c.productId == productId);
        }

        public Task<List<Cart>> GetByUserId(string userId)
        {
            return _dbContext.MyCart.Where(c => c.userId == userId).ToListAsync();
        }

        public Task Add(Cart cart)
        {
            _dbContext.MyCart.Add(cart);
            return _dbContext.SaveChangesAsync();
        }

        public Task Update(Cart cart)
        {
            _dbContext.Entry(cart).State = EntityState.Modified;
            return _dbContext.SaveChangesAsync();
        }

        public Task Remove(Cart cart)
        {
            _dbContext.MyCart.Remove(cart);
            return _dbContext.SaveChangesAsync();
        }
    }

}
