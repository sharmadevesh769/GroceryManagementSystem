using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
    }
}
