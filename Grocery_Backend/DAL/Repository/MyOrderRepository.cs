using DAL.Data;
using Microsoft.EntityFrameworkCore;

using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class MyOrderRepository : IMyOrderRepository
    {
        private readonly GroceryManagementDbContext groceryManagementDbContext;

        public MyOrderRepository(GroceryManagementDbContext groceryManagementDbContext)
        {
            this.groceryManagementDbContext = groceryManagementDbContext;
        }
         async Task<List<MyOrder>> IMyOrderRepository.GetOrdersByUserIdAsync(string userId)
        {
            var Orders = await groceryManagementDbContext.MyOrders
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Orders;
        }

        async Task IMyOrderRepository.PlaceOrderAsync(List<MyOrder> orders)
        {
            foreach (var myOrder in orders)
            {
                var product = await groceryManagementDbContext.Product.FirstOrDefaultAsync(p => p.Id == myOrder.ProductId);
                if (product.Quantity < myOrder.ProductQuantity)
                {
                    throw new Exception("Please check the product Quantity");
                }

                var cartItem = await groceryManagementDbContext.MyCart.FirstOrDefaultAsync(p => p.Id == myOrder.CartId);
                if (cartItem == null)
                {
                    throw new Exception("Cart Not Found");
                }
                product.Quantity -= myOrder.ProductQuantity;

                await groceryManagementDbContext.MyOrders.AddAsync(myOrder);
                groceryManagementDbContext.MyCart.Remove(cartItem);
            }
            await groceryManagementDbContext.SaveChangesAsync();
        }
    }
}
