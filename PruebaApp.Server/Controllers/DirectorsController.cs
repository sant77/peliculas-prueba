using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaApp.Server.Data;
using PruebaApp.Server.Models;
using PruebaApp.Server.Dtos;

namespace PruebaApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DirectorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/directors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectorReadDto>>> GetDirectors()
        {
            var directors = await _context.Directors
                .Include(d => d.Country)
                .ToListAsync();

            var dtoList = directors.Select(d => new DirectorReadDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                CountryName = d.Country.Name
            }).ToList();

            return dtoList;
        }

        // GET api/directors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectorReadDto>> GetDirector(int id)
        {
            var director = await _context.Directors
                .Include(d => d.Country)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (director == null) return NotFound();

            return new DirectorReadDto
            {
                Id = director.Id,
                FirstName = director.FirstName,
                LastName = director.LastName,
                CountryName = director.Country.Name
            };
        }

        // POST api/directors
        [HttpPost]
        public async Task<ActionResult<DirectorReadDto>> CreateDirector(DirectorCreateDto dto)
        {
            var director = new Director
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                CountryId = dto.CountryId
            };

            _context.Directors.Add(director);
            await _context.SaveChangesAsync();

            var result = new DirectorReadDto
            {
                Id = director.Id,
                FirstName = director.FirstName,
                LastName = director.LastName,
                CountryName = (await _context.Countries.FindAsync(director.CountryId))?.Name ?? ""
            };

            return CreatedAtAction(nameof(GetDirector), new { id = director.Id }, result);
        }

        // PUT api/directors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDirector(int id, DirectorUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var director = await _context.Directors.FindAsync(id);
            if (director == null) return NotFound();

            director.FirstName = dto.FirstName;
            director.LastName = dto.LastName;
            director.CountryId = dto.CountryId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/directors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirector(int id)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director == null) return NotFound();

            _context.Directors.Remove(director);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
