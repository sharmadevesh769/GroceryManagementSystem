using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface ICartServices
    {
        Task<Cart> GetById(Guid id);
        Task<Cart> GetByUserIdAndProductId(string userId, Guid productId);
        Task<List<Cart>> GetByUserId(string userId);
        Task Add(Cart cart);
        Task Update(Cart cart);
        Task Remove(Cart cart);
    }
}
