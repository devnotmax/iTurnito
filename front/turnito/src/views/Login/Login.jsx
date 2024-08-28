
import "./Login.css";
import { useState, useCallback, useEffect } from "react";
import { validateLoginForm } from "../../helpers/validateForm";
import { loginSuccess, loginError } from "../../components/Alerts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userActive);
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    setErrors(validateLoginForm(formData));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setSuccess("Inicio de sesión exitoso");
        setFormData({ username: "", password: "" });
        setErrors({});
        loginSuccess();
        dispatch(addUser(response.data.user));
        navigate("/"); // Redirige a la página de inicio
      }
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? "Por favor verifica las credenciales e intenta nuevamente."
          : error.response?.status === 409
          ? "El nombre de usuario ya existe. Por favor, elija otro."
          : error.response?.data?.message || "Error en el inicio de sesión.";

      setErrors({ server: errorMessage });
      loginError(errorMessage);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <a className="logo" href="/">
            <h1>
              <i className="bx bx-plus-medical"></i> Iturnito
            </h1>
          </a>
          <div className="glass-effect"></div>
          <div className="content">
            <h2>Bienvenido/a!</h2>
            <p>
              Para seguir conectado/a con nosotros, por favor inicia sesión con
              tus datos personales.
            </p>
          </div>
        </div>
        <div className="login-form">
          <h2>Iniciar sesión.</h2>
          <form onSubmit={handleSubmit}>
            {errors.server && <p className="error">{errors.server}</p>}
            {success && <p className="success">{success}</p>}
            <div>
              <label>
                <i className="bx bx-user"></i> Usuario
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="username"
                value={formData.username}
                placeholder="Nombre de usuario"
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div>
              <label>
                <i className="bx bx-lock"></i> Contraseña
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                placeholder="Contraseña"
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button type="submit">Iniciar sesión</button>
            </div>
          </form>
          <a href="#">
            <p>¿Has olvidado tu contraseña?</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
