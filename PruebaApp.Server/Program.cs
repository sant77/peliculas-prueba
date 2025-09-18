using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PruebaApp.Server.Data;
using PruebaApp.Server.Services;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// 1. Servicios propios
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<JwtService>();

// 2. DbContext (ejemplo con SQL Server)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 3. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173",
                                    "http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// 4. Autenticación con JWT
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });

builder.Services.AddControllers();

var app = builder.Build();

// Middleware
app.UseCors("AllowReactApp");
app.UseAuthentication(); // 👈 SIEMPRE antes que UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();

