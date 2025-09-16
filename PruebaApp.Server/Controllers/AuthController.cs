using Microsoft.AspNetCore.Mvc;
using PruebaApp.Server.Models;

namespace PruebaApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // 🚨 Por ahora usuarios hardcodeados, luego se conectará con SQL Server
        private readonly List<User> users = new()
        {
            new User { Username = "admin", Password = "1234" },
            new User { Username = "user", Password = "abcd" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = users.FirstOrDefault(u => 
                u.Username == login.Username && u.Password == login.Password);

            if (user == null)
                return Unauthorized(new { message = "Credenciales inválidas" });

            return Ok(new { message = "Login exitoso", username = user.Username });
        }
    }
}
