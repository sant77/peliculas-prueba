namespace PruebaApp.Server.Models
{
    public class Actor
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        
        public int CountryId { get; set; }
        public Country? Country { get; set; }

        public ICollection<Movie>? Movies { get; set; }
    }
}
