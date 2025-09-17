namespace PruebaApp.Server.Models
{
    public class Director
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";

        public int CountryId { get; set; }
        public Country Country { get; set; } = null!;

        // Relación 1:N con películas
        public ICollection<Movie> Movies { get; set; } = new List<Movie>();
    }
}
