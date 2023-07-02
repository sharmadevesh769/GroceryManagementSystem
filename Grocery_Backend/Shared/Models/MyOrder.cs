using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class MyOrder
    {
        [Key]
        public Guid OrderId { get; set; }
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime OrderDate { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductAmount { get; set; }
        public int TotalAmount { get; set; }
        public string UserId { get; set; }
    }
}
