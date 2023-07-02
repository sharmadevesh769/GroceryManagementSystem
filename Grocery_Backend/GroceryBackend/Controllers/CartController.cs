using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using DAL.Data;
using System.Threading.Tasks;


namespace GroceryBackend.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly GroceryManagementDbContext _groceryManagementDbContext;


        public CartController(GroceryManagementDbContext groceryManagementDbContext)
        {
            _groceryManagementDbContext = groceryManagementDbContext;

        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] Cart cart)
        {

            var product = await _groceryManagementDbContext.Product.FirstOrDefaultAsync(p => p.Id == cart.productId);

            if (product == null)
            {
                return NotFound("Product not Found");
            }

            var existingCart = await _groceryManagementDbContext.MyCart.FirstOrDefaultAsync(c => c.userId == cart.userId && c.productId == cart.productId);
            if (existingCart != null && (existingCart.AddedQuantity < product.Quantity))
            {
                existingCart.AddedQuantity += 1;
            }
            else if (existingCart == null && product.Quantity > 0)
            {
                cart.AddedQuantity = 1;
                _groceryManagementDbContext.MyCart.Add(cart);
            }
            else
            {

                return BadRequest("Product Quantity Exceeded than the available quantity");
            }

            _groceryManagementDbContext.SaveChanges();

            return Ok(cart);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartItems(string userId)
        {
            var cartItems = _groceryManagementDbContext.MyCart
                .Where(c => c.userId == userId)
                .ToList();

            var productIds = cartItems.Select(c => c.productId).ToList();
            var products = await _groceryManagementDbContext.Product
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync();

            var cartItemDetails = cartItems.Select(c => new
            {
                id = c.Id,
                Product = products.FirstOrDefault(p => p.Id == c.productId),
                AddedQuantity = c.AddedQuantity
            }).ToList();

            return Ok(cartItemDetails);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCartItem(Guid id)
        {
            var cartItem = await _groceryManagementDbContext.MyCart.FirstOrDefaultAsync(c => c.Id == id);
            if (cartItem == null)
            {
                return NotFound("Cart  item not found");

            }
            _groceryManagementDbContext.MyCart.Remove(cartItem);
            await _groceryManagementDbContext.SaveChangesAsync();
            return Ok(new { message = "item deleted" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> IncreaseQuantity(Guid id, [FromBody] Cart item)
        {
            var cartitem = await _groceryManagementDbContext.MyCart.FirstOrDefaultAsync(c => c.Id == id);
            if (cartitem == null)
            {
                return NotFound("Cart item not found");

            }

            var product = await _groceryManagementDbContext.Product.FirstOrDefaultAsync(c => c.Id == cartitem.productId);
            if (product == null)
            {
                return BadRequest("Product not found");
            }

            if (cartitem.AddedQuantity == 1 && cartitem.AddedQuantity > item.AddedQuantity) return await RemoveCartItem(id);
            if (cartitem.AddedQuantity < product.Quantity)
            {
                cartitem.AddedQuantity = item.AddedQuantity;
                await _groceryManagementDbContext.SaveChangesAsync();
                return Ok(new { message = "Quantity Altered" });
            }
            if (cartitem.AddedQuantity == product.Quantity && cartitem.AddedQuantity > item.AddedQuantity)
            {
                cartitem.AddedQuantity = item.AddedQuantity;
                await _groceryManagementDbContext.SaveChangesAsync();
                return Ok(new { message = "Quantity Altered" });
            }

            return BadRequest("Product quantity limit exceeded");
        }

    }
}


