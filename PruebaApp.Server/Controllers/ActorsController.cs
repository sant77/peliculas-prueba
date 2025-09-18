using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaApp.Server.Data;
using PruebaApp.Server.Models;
using PruebaApp.Server.Dtos;

namespace PruebaApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActorsController(AppDbContext context)
        {
            _context = context;
        }

       [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorDto>>> GetActors()
        {
            var actors = await _context.Actors
                .Include(a => a.Country)
                .Include(a => a.Movies)
                .Select(a => new ActorDto
                {
                    Id = a.Id,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    CountryName = a.Country.Name,
                    Movies = a.Movies.Select(m => m.Title).ToList()
                })
                .ToListAsync();

            return actors;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDto>> GetActor(int id)
        {
            var actor = await _context.Actors
                .Include(a => a.Country)
                .Include(a => a.Movies)
                .Select(a => new ActorDto
                {
                    Id = a.Id,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    CountryName = a.Country.Name,
                    Movies = a.Movies.Select(m => m.Title).ToList()
                })
                .FirstOrDefaultAsync(a => a.Id == id);

            if (actor == null) return NotFound();
            return actor;
        }

        [HttpPost]
        public async Task<ActionResult<ActorDto>> CreateActor(CreateActorDto actorDtoActorDto)
        {
            var actor = new Actor
            {
                FirstName = actorDtoActorDto.FirstName,
                LastName = actorDtoActorDto.LastName,
                CountryId = actorDtoActorDto.CountryId
            };

            if (actorDtoActorDto.MovieIds != null && actorDtoActorDto.MovieIds.Any())
            {
                actor.Movies = await _context.Movies
                    .Where(m => actorDtoActorDto.MovieIds.Contains(m.Id))
                    .ToListAsync();
            }

            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();

            var result = new ActorDto
            {
                Id = actor.Id,
                FirstName = actor.FirstName,
                LastName = actor.LastName,
                CountryName = (await _context.Countries.FindAsync(actor.CountryId))?.Name ?? "",
                Movies = actor.Movies.Select(m => m.Title).ToList()
            };

            return CreatedAtAction(nameof(GetActor), new { id = actor.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActor(int id, UpdateActorDto actorDtoActorDto)
        {
            var actor = await _context.Actors
                .Include(a => a.Movies)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (actor == null) return NotFound();

            actor.FirstName = actorDtoActorDto.FirstName;
            actor.LastName = actorDtoActorDto.LastName;
            actor.CountryId = actorDtoActorDto.CountryId;

            if (actorDtoActorDto.MovieIds != null)
            {
                // Reemplazar las películas asociadas
                actor.Movies = await _context.Movies
                    .Where(m => actorDtoActorDto.MovieIds.Contains(m.Id))
                    .ToListAsync();
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
