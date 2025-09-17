import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">🎬 PruebaApp</h1>
      <div className="flex gap-4">
        <Link className="hover:text-blue-400 transition" to="/">Login</Link>
        <Link className="hover:text-blue-400 transition" to="/home">Inicio</Link>
      </div>
    </nav>
  );
}

export default Navbar;
