using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class Cart
    {   
        public Guid Id { get; set; }
        public Guid productId { get; set; }
        public string userId { get; set; }
        public int AddedQuantity { get; set; }

    }
}
