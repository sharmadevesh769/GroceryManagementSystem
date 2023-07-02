using DAL.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class ProductServices : IProductServices
    {
        private readonly IProductRepository productRepository;

        public ProductServices(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        public Task AddProductAsync(Product product)
        {
            return productRepository.AddProductAsync(product);
        }

        public Task DeleteProductAsync(Guid id)
        {
            return productRepository.DeleteProductAsync(id);
        }

        public Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return productRepository.GetAllProductsAsync();
        }

        public Task<Product> GetProductByIdAsync(Guid id)
        {
            return productRepository.GetProductByIdAsync(id);
        }

        public Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            return productRepository.GetProductsByCategoryAsync(category);
        }

        public Task UpdateProductAsync(Product product)
        {
            return productRepository.UpdateProductAsync(product);
        }
    }
}
