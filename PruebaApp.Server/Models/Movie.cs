namespace PruebaApp.Server.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Review { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";
        public string TrailerCode { get; set; } = "";

        public int GenreId { get; set; }
        public Genre? Genre { get; set; }

        public int CountryId { get; set; }
        public Country? Country { get; set; }

        public int DirectorId { get; set; }
        public Director? Director { get; set; }

        public ICollection<Actor>? Actors { get; set; }
    }
}
