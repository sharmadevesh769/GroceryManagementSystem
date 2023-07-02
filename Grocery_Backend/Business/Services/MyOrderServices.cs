using DAL.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class MyOrderServices : IMyOrderServices
    {
        private readonly IMyOrderRepository myOrderRepository;

        public MyOrderServices(IMyOrderRepository myOrderRepository)
        {
            this.myOrderRepository = myOrderRepository;
        }
        public Task<List<MyOrder>> GetOrdersByUserIdAsync(string userId)
        {
            return myOrderRepository.GetOrdersByUserIdAsync(userId);
        }

        public Task PlaceOrderAsync(List<MyOrder> orders)
        {
            return myOrderRepository.PlaceOrderAsync(orders);
        }
    }
}
