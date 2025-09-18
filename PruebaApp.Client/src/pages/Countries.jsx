import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Countries() {
  const { token } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ id: 0, name: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCountries = async () => {
    const res = await fetch("http://localhost:5017/api/countries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5017/api/countries/${form.id}`
      : "http://localhost:5017/api/countries";
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
      fetchCountries();
      setForm({ id: 0, name: "" });
      setIsEditing(false);
    }
  };

  const handleEdit = (country) => {
    setForm(country);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este país?")) return;
    await fetch(`http://localhost:5017/api/countries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCountries();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Países</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 flex gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del país"
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
          {countries.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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

export default Countries;
