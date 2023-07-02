using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IMyOrderServices
    {
        Task PlaceOrderAsync(List<MyOrder> orders);
        Task<List<MyOrder>> GetOrdersByUserIdAsync(string userId);
    }
}
