import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Login</Link>
      <Link to="/home">Inicio</Link>
    </nav>
  );
}

export default Navbar;
