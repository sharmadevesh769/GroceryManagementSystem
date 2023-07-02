using GroceryBackend.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class CartServices : ICartServices
    {
        private readonly ICartRepository cartRepository;

        public CartServices( ICartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }
        public Task Add(Cart cart)
        {
            return cartRepository.Add(cart);
        }

        public Task<Cart> GetById(Guid id)
        {
            return cartRepository.GetById(id);
        }

        public Task<List<Cart>> GetByUserId(string userId)
        {
            return cartRepository.GetByUserId(userId);
        }

        public Task<Cart> GetByUserIdAndProductId(string userId, Guid productId)
        {
            return GetByUserIdAndProductId(userId, productId);
        }

        public Task Remove(Cart cart)
        {
            return cartRepository.Remove(cart);
        }

        public Task Update(Cart cart)
        {
            return cartRepository.Update(cart);
        }
    }
}
