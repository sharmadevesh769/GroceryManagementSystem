using Shared.Models;
using System.Threading.Tasks;

namespace GroceryBackend.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);
        Task CreateUser(User user);
    }
}
