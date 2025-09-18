import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Genres() {
  const { token } = useContext(AuthContext);
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({ id: 0, name: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchGenres = async () => {
    const res = await fetch("http://149.102.142.6:5017/api/genres", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setGenres(data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://149.102.142.6:5017/api/genres/${form.id}`
      : "http://149.102.142.6:5017/api/genres";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchGenres();
      setForm({ id: 0, name: "" });
      setIsEditing(false);
    }
  };

  const handleEdit = (genre) => {
    setForm(genre);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este género?")) return;
    await fetch(`http://149.102.142.6:5017/api/genres/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchGenres();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Géneros</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 flex gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del género"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-1/2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Tabla */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.id} className="text-center">
              <td className="p-2 border">{g.id}</td>
              <td className="p-2 border">{g.name}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(g)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Genres;
