using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IMyOrderRepository
    {
        Task PlaceOrderAsync(List<MyOrder> orders);
        Task<List<MyOrder>> GetOrdersByUserIdAsync(string userId);
    }
}
