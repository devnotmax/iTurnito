import "./App.css";
import Home from "./views/Home.jsx";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/NavBar.jsx";
import MisTurnos from "./views/misTurnos/MisTurnos.jsx";
import Register from "./views/Register/Register.jsx";
import Login from "./views/Login/Login.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import About from "./views/About/About.jsx";
import { Routes, Route } from "react-router-dom";
import NewAppointment from "./views/NewAppointment/NewAppointment.jsx";

function App() {
  return (
    <>
      <NavBar />
      <div
        style={{
          width: "80vw",
          margin: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          borderRadius: "1rem",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turnos" element={<MisTurnos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agendar" element={<NewAppointment />} />
          <Route
            path="/error"
            element={
              <>
                <NotFound />{" "}
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    color: "#046bf2",
                    fontWeight: "bold",
                  }}
                >
                  Acceso Denegado: Debes loguearte.
                </p>
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
        
      </div>

      <Footer />
    </>
  );
}

export default App;
