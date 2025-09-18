using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaApp.Server.Data;
using PruebaApp.Server.Models;
using PruebaApp.Server.Dtos;

namespace PruebaApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MoviesController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieReadDto>>> GetMovies()
        {
            var movies = await _context.Movies
                .Include(m => m.Genre)
                .Include(m => m.Country)
                .Include(m => m.Director)
                .Include(m => m.Actors)
                .ToListAsync();

            return movies.Select(m => new MovieReadDto
            {
                Id = m.Id,
                Title = m.Title,
                Review = m.Review,
                CoverImageUrl = m.CoverImageUrl,
                GenreName = m.Genre.Name,
                CountryName = m.Country.Name,
                DirectorName = $"{m.Director.FirstName} {m.Director.LastName}",
                ActorNames = m.Actors.Select(a => $"{a.FirstName} {a.LastName}").ToList()
            }).ToList();
        }

        // GET api/movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieReadDto>> GetMovie(int id)
        {
            var movie = await _context.Movies
                .Include(m => m.Genre)
                .Include(m => m.Country)
                .Include(m => m.Director)
                .Include(m => m.Actors)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (movie == null) return NotFound();

            return new MovieReadDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Review = movie.Review,
                CoverImageUrl = movie.CoverImageUrl,
                GenreName = movie.Genre.Name,
                CountryName = movie.Country.Name,
                DirectorName = $"{movie.Director.FirstName} {movie.Director.LastName}",
                ActorNames = movie.Actors.Select(a => $"{a.FirstName} {a.LastName}").ToList()
            };
        }

        // POST api/movies
        [HttpPost]
        public async Task<ActionResult<MovieReadDto>> CreateMovie(MovieCreateDto dto)
        {
            var movie = new Movie
            {
                Title = dto.Title,
                Review = dto.Review,
                CoverImageUrl = dto.CoverImageUrl,
                GenreId = dto.GenreId,
                CountryId = dto.CountryId,
                DirectorId = dto.DirectorId
            };

            // Asignar actores
            movie.Actors = await _context.Actors
                .Where(a => dto.ActorIds.Contains(a.Id))
                .ToListAsync();

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, dto);
        }

        // PUT api/movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, MovieUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var movie = await _context.Movies
                .Include(m => m.Actors)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (movie == null) return NotFound();

            movie.Title = dto.Title;
            movie.Review = dto.Review;
            movie.CoverImageUrl = dto.CoverImageUrl;
            movie.GenreId = dto.GenreId;
            movie.CountryId = dto.CountryId;
            movie.DirectorId = dto.DirectorId;

            // actualizar actores
            movie.Actors.Clear();
            movie.Actors = await _context.Actors
                .Where(a => dto.ActorIds.Contains(a.Id))
                .ToListAsync();

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return NotFound();

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
