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
    public class ProductRepository : IProductRepository
    {
        private readonly GroceryManagementDbContext _groceryManagementDbContext;

        public ProductRepository(GroceryManagementDbContext groceryManagementDbContext)
        {
            _groceryManagementDbContext = groceryManagementDbContext;
        }
        public async Task  AddProductAsync(Product product)
        {
            product.Id = Guid.NewGuid();
            await _groceryManagementDbContext.Product.AddAsync(product);
            await _groceryManagementDbContext.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Guid id)
        {
            var product = await _groceryManagementDbContext.Product.FindAsync(id);
            if (product != null)
            {
                _groceryManagementDbContext.Product.Remove(product);
                await _groceryManagementDbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _groceryManagementDbContext.Product.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            return await _groceryManagementDbContext.Product.Where(p=>p.Category==category).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await _groceryManagementDbContext.Product.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdateProductAsync(Product product)
        {
            _groceryManagementDbContext.Product.Update(product);
            await _groceryManagementDbContext.SaveChangesAsync();
        }
    }
}
