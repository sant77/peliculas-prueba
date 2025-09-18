namespace PruebaApp.Server.Dtos
{
    // Crear una película
    public class MovieCreateDto
    {
        public string Title { get; set; } = "";
        public string Review { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";

        public int GenreId { get; set; }
        public int CountryId { get; set; }
        public int DirectorId { get; set; }

        // IDs de actores relacionados
        public List<int> ActorIds { get; set; } = new();
    }

    // Actualizar una película
    public class MovieUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Review { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";

        public int GenreId { get; set; }
        public int CountryId { get; set; }
        public int DirectorId { get; set; }

        public List<int> ActorIds { get; set; } = new();
    }

    // Devolver información de la película
    public class MovieReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Review { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";

        public string GenreName { get; set; } = "";
        public string CountryName { get; set; } = "";
        public string DirectorName { get; set; } = "";

        public List<string> ActorNames { get; set; } = new();
    }
}
