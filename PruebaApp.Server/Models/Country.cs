namespace PruebaApp.Server.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";

        public ICollection<Director>? Directors { get; set; }
        public ICollection<Actor>? Actors { get; set; }
        public ICollection<Movie>? Movies { get; set; }
    }
}
