using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryBackend.Models
{
    public class AddProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public string Specification { get; set; }
        public string Seller { get; set; }
    }
}
