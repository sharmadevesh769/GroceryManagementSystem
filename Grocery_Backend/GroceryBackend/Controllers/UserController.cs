using Business.Services;
using GroceryBackend.Helper;
using GroceryBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using System.Threading.Tasks;

namespace GroceryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;

        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Login([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await userServices.GetUserByEmail(userObj.Email);
            if (user == null)
                return NotFound(new { Message = "User Not Found" });

            if (!passwordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            user.Token = TokenGeneration.createJWT(user);

            return Ok(new
            {
                Token = user.Token,
                Name = user.Name,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await userServices.GetUserByEmail(userObj.Email);
            if (user != null)
                return BadRequest(new { Message = "User Already Exists" });

            var pass = PasswordStrength.checkPasswordStrenth(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = "Password is Weak" });
            }

            if (userObj.Name.Length>50)
            {
                return BadRequest(new { Message = "Name Should not exceed 50 Words" });
            }


            userObj.Password = passwordHasher.HashPassword(userObj.Password);

            await userServices.CreateUser(userObj);

            return Ok(new { message = "User Registered" });
        }
    }
}
