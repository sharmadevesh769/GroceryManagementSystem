using GroceryBackend.Repositories;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository userRepository;

        public UserServices(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public Task CreateUser(User user)
        {
            return userRepository.CreateUser(user);
        }

        public Task<User> GetUserByEmail(string email)
        {
            return userRepository.GetUserByEmail(email);
        }
    }
}
