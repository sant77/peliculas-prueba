import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">🎬 PruebaApp</h1>
      <div className="flex gap-4">
        <Link className="hover:text-blue-400 transition" to="/">Inicio</Link>

        {!token ? (
          <Link className="hover:text-blue-400 transition" to="/login">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-400 transition"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
