namespace PruebaApp.Server.Dtos
{
    // Para crear un director
    public class DirectorCreateDto
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public int CountryId { get; set; }
    }

    // Para actualizar un director
    public class DirectorUpdateDto
    {
        public int Id { get; set; } // opcional, si quieres validarlo en body
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public int CountryId { get; set; }
    }

    // Para devolver datos (incluyendo país)
    public class DirectorReadDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string CountryName { get; set; } = "";
    }
}
