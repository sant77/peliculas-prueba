using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaApp.Server.Data;
using PruebaApp.Server.Models;
using PruebaApp.Server.Services;

namespace PruebaApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordService _passwordService;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, PasswordService passwordService, JwtService jwtService)
        {
            _context = context;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest(new { message = "El usuario ya existe" });

            user.Password = _passwordService.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (user == null) return Unauthorized(new { message = "Credenciales inválidas" });

            if (!_passwordService.VerifyPassword(user.Password, login.Password))
                return Unauthorized(new { message = "Credenciales inválidas" });

            var token = _jwtService.GenerateToken(user.Username);
            return Ok(new { message = "Login exitoso", token });
        }
    }
}
