using Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using DAL.Repository;
using Business.Services;

namespace GroceryBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        
        private readonly IProductServices productServices;

        public ProductController(IProductServices productServices)
        {
          
            this.productServices = productServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int pageNumber = 1, int pageSize = 8, string category = null)
        {

            var products = await productServices.GetAllProductsAsync();

            if (!string.IsNullOrEmpty(category))
            {
                products = products.Where(p => p.Category == category);
            }

            var totalCount = products.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var result = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                Products = products.Skip((pageNumber - 1) * pageSize).Take(pageSize)
            };
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddProduct([FromBody] Product addProduct)
        {
            await productServices.AddProductAsync(addProduct);
            return Ok(addProduct);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProduct([FromRoute] Guid id)
        {
            var product = await productServices.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, Product updateProduct)
        {
            var product = await productServices.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = updateProduct.Name;
            product.Description = updateProduct.Description;
            product.Category = updateProduct.Category;
            product.Quantity = updateProduct.Quantity;
            product.Image = updateProduct.Image;
            product.Price = updateProduct.Price;
            product.Discount = updateProduct.Discount;
            product.Specification = updateProduct.Specification;
            await productServices.UpdateProductAsync(product);
            return Ok(product);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await productServices.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            await productServices.DeleteProductAsync(id);
            return Ok();
        }
    }
}
