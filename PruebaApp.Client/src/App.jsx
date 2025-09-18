import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Directors from "./pages/Directors";
import Genres from "./pages/Genres";
import Countries from "./pages/Countries";
import Actors from "./pages/Actors";
import Movies from "./pages/Movies";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Privadas */}
          <Route
            path="/directors"
            element={
              <PrivateRoute>
                <Directors />
              </PrivateRoute>
            }
          />
          <Route
            path="/genres"
            element={
              <PrivateRoute>
                <Genres />
              </PrivateRoute>
            }
          />
          <Route
            path="/countries"
            element={
              <PrivateRoute>
                <Countries />
              </PrivateRoute>
            }
          />
          <Route
            path="/actors"
            element={
              <PrivateRoute>
                <Actors />
              </PrivateRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
