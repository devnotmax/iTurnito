import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { validateForm } from "../../helpers/validateForm"; // Importa el helper
import { successAlert, errorAlert } from "../../components/Alerts";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", // Cambiado a 'name'
    email: "",
    birthdate: "", // Cambiado a 'birthdate'
    nDni: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const updatedErrors = validateForm({ ...formData, [name]: value });
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "", // Cambiado a 'name'
          email: "",
          birthdate: "",
          nDni: "",
          username: "",
          password: "",
        });
        setErrors({});
        successAlert();
        navigate("/login");
      }
    } catch (error) {
      let errorMessage = "Error en el registro.";
      if (error.response) {
        if (error.response.status === 500) {
          errorMessage = "Error del servidor. Por favor, inténtelo más tarde.";
        } else if (error.response.status === 409) {
          errorMessage =
            "El nombre de usuario ya existe. Por favor, elija otro.";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      setErrors({ server: errorMessage });
      errorAlert(errorMessage);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-content">
          <a className="logo" href="/">
            <h1>
              <i className="bx bx-plus-medical"></i> Iturnito
            </h1>
          </a>
          <div className="glass-effect"></div>
          <div className="content">
            <h2>Bienvenido!</h2>
            <p>
              ¡Bienvenido! Para seguir disfrutando de nuestros servicios y
              mantenerte conectado con nosotros, te invitamos a registrar tus
              datos personales o iniciar sesión en tu cuenta. Así podrás acceder
              a todas nuestras funcionalidades y mantenerte al día con las
              novedades.
            </p>
            <button>Ya tengo una cuenta.</button>
          </div>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            {errors.server && <p className="error">{errors.server}</p>}
            {success && <p className="success">Registro exitoso!</p>}
            <div>
              <label>
                <i className="bx bx-male-female"></i> Nombre
              </label>
              <input
                type="text"
                name="name" // Cambiado a 'name'
                value={formData.name} // Cambiado a 'name'
                onChange={handleChange}
                className={errors.name ? "input-error" : "input-success"}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <label>
                <i className="bx bxs-envelope"></i> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : "input-success"}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>
                <i className="bx bx-calendar-alt"></i> Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthdate" // Cambiado a 'birthdate'
                value={formData.birthdate} // Cambiado a 'birthdate'
                onChange={handleChange}
                className={errors.birthdate ? "input-error" : "input-success"}
              />
              {errors.birthdate && <p className="error">{errors.birthdate}</p>}
            </div>
            <div>
              <label>
                <i className="bx bx-id-card"></i> Número de DNI
              </label>
              <input
                type="text"
                name="nDni" // Cambiado a 'nDni'
                value={formData.nDni}
                onChange={handleChange}
                className={errors.nDni ? "input-error" : "input-success"}
              />
              {errors.nDni && <p className="error">{errors.nDni}</p>}
            </div>
            <div>
              <label>
                <i className="bx bx-user"></i> Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : "input-success"}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div>
              <label>
                <i className="bx bx-lock"></i> Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : "input-success"}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

