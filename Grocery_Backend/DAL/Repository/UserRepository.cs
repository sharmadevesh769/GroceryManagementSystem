using DAL.Data;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System.Threading.Tasks;

namespace GroceryBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly GroceryManagementDbContext groceryManagementDb;

        public UserRepository(GroceryManagementDbContext groceryManagementDb)
        {
            this.groceryManagementDb = groceryManagementDb;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await groceryManagementDb.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task CreateUser(User user)
        {
            await groceryManagementDb.Users.AddAsync(user);
            await groceryManagementDb.SaveChangesAsync();
        }
    }
}
