using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IUserServices
    {
        Task<User> GetUserByEmail(string email);
        Task CreateUser(User user);
    }
}
