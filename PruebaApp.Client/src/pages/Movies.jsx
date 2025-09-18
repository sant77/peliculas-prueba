import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";

function Movies() {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [form, setForm] = useState({
    id: 0,
    title: "",
    review: "",
    coverImageUrl: "",
    trailerCode: "",
    genreId: "",
    countryId: "",
    directorId: "",
    actorIds: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  // === API CALLS ===
  const fetchMovies = async () => {
    const res = await fetch("http://149.102.142.6:5017/api/movies", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMovies(await res.json());
  };

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [g, c, d, a] = await Promise.all([
      fetch("http://149.102.142.6:5017/api/genres", { headers }).then((r) => r.json()),
      fetch("http://149.102.142.6:5017/api/countries", { headers }).then((r) => r.json()),
      fetch("http://149.102.142.6:5017/api/directors", { headers }).then((r) => r.json()),
      fetch("http://149.102.142.6:5017/api/actors", { headers }).then((r) => r.json()),
    ]);
    setGenres(g);
    setCountries(c);
    setDirectors(d);
    setActors(a);
  };

  useEffect(() => {
    fetchMovies();
    fetchData();
  }, []);

  // === FORM HANDLERS ===
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleActorsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, actorIds: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://149.102.142.6:5017/api/movies/${form.id}`
      : "http://149.102.142.6:5017/api/movies";
    const method = isEditing ? "PUT" : "POST";

    const payload = {
      ...form,
      actorIds: form.actorIds.map((id) => parseInt(id)),
      genreId: parseInt(form.genreId),
      countryId: parseInt(form.countryId),
      directorId: parseInt(form.directorId),
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchMovies();
      resetForm();
    }
  };

  const handleEdit = (movie) => {
    setForm({
      id: movie.id,
      title: movie.title,
      review: movie.review,
      coverImageUrl: movie.coverImageUrl,
      trailerCode: movie.trailerCode,
      genreId: movie.genreId,
      countryId: movie.countryId,
      directorId: movie.directorId,
      actorIds: movie.actorIds.map((id) => id.toString()),
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta película?")) return;
    await fetch(`http://149.102.142.6:5017/api/movies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMovies();
  };

  const resetForm = () => {
    setForm({
      id: 0,
      title: "",
      review: "",
      coverImageUrl: "",
      trailerCode: "",
      genreId: "",
      countryId: "",
      directorId: "",
      actorIds: [],
    });
    setIsEditing(false);
  };

  // === RENDER ===
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Películas</h1>

      {/* === FORMULARIO === */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="genreId"
          value={form.genreId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Género --</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <select
          name="countryId"
          value={form.countryId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- País --</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          name="directorId"
          value={form.directorId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Director --</option>
          {directors.map((d) => (
            <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>
          ))}
        </select>
        <select
          multiple
          name="actorIds"
          value={form.actorIds}
          onChange={handleActorsChange}
          className="border p-2 rounded col-span-2"
        >
          {actors.map((a) => (
            <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
          ))}
        </select>
        <textarea
          name="review"
          placeholder="Reseña"
          value={form.review}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          rows="3"
        />
        <input
          type="text"
          name="coverImageUrl"
          placeholder="URL de portada"
          value={form.coverImageUrl}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="text"
          name="trailerCode"
          placeholder="Código de tráiler YouTube"
          value={form.trailerCode}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <div className="col-span-2 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* === TABLA === */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Género</th>
            <th className="p-2 border">País</th>
            <th className="p-2 border">Director</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id} className="text-center">
              <td className="p-2 border">{m.title}</td>
              <td className="p-2 border">{m.genreName}</td>
              <td className="p-2 border">{m.countryName}</td>
              <td className="p-2 border">
                {m.director?.firstName} {m.directorName}
              </td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => setSelectedMovie(m)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Ver más
                </button>
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === MODAL DE DETALLES === */}
      <Modal isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)}>
        {selectedMovie && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
            <p className="text-gray-700">{selectedMovie.review}</p>
            <p><strong>Género:</strong> {selectedMovie.genreName}</p>
            <p><strong>País:</strong> {selectedMovie.countryName}</p>
            <p><strong>Director:</strong> {selectedMovie.directorName}</p>
            <p>
              <strong>Actores:</strong>{" "}
                {selectedMovie.actorNames?.join(", ")}
            </p>
            {selectedMovie.coverImageUrl && (
              <img
                src={selectedMovie.coverImageUrl}
                alt="Portada"
                className="w-64 rounded shadow"
              />
            )}
            {selectedMovie.trailerCode && (
              <div className="mt-4">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${selectedMovie.trailerCode}`}
                  title="Trailer"
                  className="rounded"
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Movies;
