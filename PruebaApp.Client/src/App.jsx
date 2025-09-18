import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Directors from "./pages/Directors";
import Genres from "./pages/Genres";
import Countries from "./pages/Countries";
import MainLayout from "./layouts/MainLayout";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
