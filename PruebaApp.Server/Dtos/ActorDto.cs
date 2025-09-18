namespace PruebaApp.Server.Dtos
{
    public class ActorDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string CountryName { get; set; } = "";
        
        // Títulos de películas
        public List<string> Movies { get; set; } = new();

        // 👇 Nuevo: IDs de las películas
        public List<int> MovieIds { get; set; } = new();
    }

    public class CreateActorDto
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public int CountryId { get; set; }
        public List<int>? MovieIds { get; set; }
    }

    public class UpdateActorDto
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public int CountryId { get; set; }
        public List<int>? MovieIds { get; set; }
    }
}
