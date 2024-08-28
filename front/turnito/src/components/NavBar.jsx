import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/reducer";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const user = useSelector((state) => state.userActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <nav>
      <div className="navbar">
        <Link className="logo" to="/home">
          <p>Iturnito</p>
        </Link>

        <div className="burger" onClick={toggleMenu}>
          <i className={`bx ${menuActive ? "bx-x" : "bx-menu"}`}></i>
        </div>

        <ul className={`nav-links ${menuActive ? "active" : ""}`}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to={"/about"}>Acerca de</Link>
          </li>
          <li>
            {user.name ? (
              <>
                <Link to="/turnos">Mis turnos</Link>
              </>
            ) : (
              ""
            )}
          </li>
          {/* <li>
            {user.name ? (
              <button className="btn-logout" onClick={handleLogout}>
                Logout<i class='bx bx-log-out'></i>
              </button>
            ) : (
              ""
            )}
          </li> */}
        </ul>

        {user.name ? (
          <div className="welcome-message">
            <h2>Bienvenido, {user.name}! 🦖</h2>
            <ul>
              <li>
                {user.name ? (
                  <button className="btn-logout" onClick={handleLogout}>
                    Logout <i class="bx bx-log-out"></i>
                  </button>
                ) : (
                  ""
                )}
              </li>
              <li>
                {user.name ? (
                  <button className="btn-schedule">
                    <Link to="/agendar">
                      <p>
                        Agendar turno <i class="bx bxs-calendar-plus"></i>
                      </p>
                    </Link>
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        ) : (
          <ul className={`nav-buttons ${menuActive ? "active" : ""}`}>
            <li className="btn-primary">
              {/* <a href="#">Iniciar Sesion</a> */}
              <Link to="/login">Iniciar Sesion</Link>
            </li>
            <li className="btn-secondary">
              {/* <a href="#">Registrarse</a> */}
              <Link to="/register">Registrarse</Link>
            </li>
          </ul>
        )}

        <ul className={`nav-socials ${menuActive ? "active" : ""}`}>
          <li>
            <a target="_blank" href="https://github.com/devnotmax">
              <i className="bx bxl-github"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/machifrias/">
              <i className="bx bxl-linkedin-square"></i>
            </a>
          </li>
          <li>
            <a href="mailto:develop.maxsj@gmail.com">
              <i className="bx bx-envelope"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
