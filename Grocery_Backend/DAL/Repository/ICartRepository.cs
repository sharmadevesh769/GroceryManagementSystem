using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroceryBackend.Repository
{
    public interface ICartRepository
    {
        Task<Cart> GetById(Guid id);
        Task<Cart> GetByUserIdAndProductId(string userId, Guid productId);
        Task<List<Cart>> GetByUserId(string userId);
        Task Add(Cart cart);
        Task Update(Cart cart);
        Task Remove(Cart cart);
    }
}
