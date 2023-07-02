using Business.Services;
using DAL.Repository;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroceryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyOrderController : ControllerBase
    {
        private readonly IMyOrderServices _myOrderServices;
        private readonly IProductServices productServices;

        public MyOrderController(IMyOrderServices myOrderServices, IProductServices productServices)
        {
            _myOrderServices = myOrderServices;
            this.productServices = productServices;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] List<MyOrder> orders)
        {
            try
            {
                await _myOrderServices.PlaceOrderAsync(orders);
                return Ok(new { message = "Order Placed" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetOrders(string userId)
        {
            var orders = await _myOrderServices.GetOrdersByUserIdAsync(userId);
            var orderItemDetails = new List<object>();

            foreach (var order in orders)
            {
                var product = await productServices.GetProductByIdAsync(order.ProductId);
                if (product == null)
                {
                    continue;
                }

                var orderItemDetail = new
                {
                    CartId = order.CartId,
                    OrderId = order.OrderId,
                    ProductId = order.ProductId,
                    Product = product,
                    ProductQuantity = order.ProductQuantity,
                    ProductAmount = order.ProductAmount,
                    TotalAmount = order.TotalAmount,
                    OrderDate = order.OrderDate,
                    UserID = order.UserId
                };

                orderItemDetails.Add(orderItemDetail);
            }

            return Ok(orderItemDetails);
        }
    }
}
