import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Directors() {
  const { token } = useContext(AuthContext);
  const [directors, setDirectors] = useState([]);
  const [form, setForm] = useState({ id: 0, firstName: "", lastName: "", countryId: "" });
  const [countries, setCountries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Obtener directores
  const fetchDirectors = async () => {
    const res = await fetch("http://localhost:5017/api/directors", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDirectors(data);
  };

  // Obtener países (para el select)
  const fetchCountries = async () => {
    const res = await fetch("http://localhost:5017/api/countries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchDirectors();
    fetchCountries();
  }, []);

  // Manejo de formulario
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: name === "countryId" ? parseInt(value) || "" : value
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5017/api/directors/${form.id}`
      : "http://localhost:5017/api/directors";

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
      fetchDirectors();
      setForm({ id: 0, firstName: "", lastName: "", countryId: "" });
      setIsEditing(false);
    }
  };

  const handleEdit = (director) => {
    setForm(director);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este director?")) return;
    await fetch(`http://localhost:5017/api/directors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDirectors();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Directores</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap"
      >
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
          required
        />
        <select
          name="countryId"
          value={form.countryId}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
          required
        >
          <option value="">-- País --</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
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
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">País</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((d) => (
            <tr key={d.id} className="text-center">
              <td className="p-2 border">{d.id}</td>
              <td className="p-2 border">{d.firstName}</td>
              <td className="p-2 border">{d.lastName}</td>
              <td className="p-2 border">{d.country?.name}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
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

export default Directors;
