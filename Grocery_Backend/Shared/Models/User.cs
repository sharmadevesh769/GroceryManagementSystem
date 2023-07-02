using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public long PhoneNumber { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

    }
}
