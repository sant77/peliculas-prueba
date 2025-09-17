namespace PruebaApp.Server.Models
{
    public class Director
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        
        public int CountryId { get; set; }
        public Country? Country { get; set; }
    }
}
