import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addAppointments } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";
import "./NewAppointment.css";

const NewAppointment = () => {
  const user = useSelector((state) => state.userActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/error");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidDateAndTime = (date, time) => {
    const selectedDate = new Date(date);
    const selectedTime = parseInt(time.split(":")[0], 10);
    const dayOfWeek = selectedDate.getDay();
    const openingHour = 8;
    const closingHour = 18;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Si es sábado (6) o domingo (0), no es válido
      return false;
    }

    if (selectedTime < openingHour || selectedTime >= closingHour) {
      // Si la hora está fuera del horario de 8 a 18, no es válida
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isValidDateAndTime(formData.date, formData.time)) {
      setLoading(false);
      setError(
        "Por favor, selecciona una fecha y hora válida. La clínica está abierta de lunes a viernes de 8:00 a 18:00."
      );
      Swal.fire({
        icon: "error",
        title: "Fecha o hora inválida",
        text: "Por favor, selecciona una fecha y hora válida. La clínica está abierta de lunes a viernes de 8:00 a 18:00.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        {
          date: formData.date,
          time: formData.time,
          description: formData.description,
          userId: user.id,
        }
      );

      console.log("Response data:", response.data);

      const updatedAppointments = user.userAppointments || [];
      dispatch(addAppointments([...updatedAppointments, response.data]));

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Turno agendado con éxito",
      });

      navigate("/turnos");
      setFormData({ date: "", time: "", description: "" });
    } catch (err) {
      console.error("Error creating appointment:", err);
      setLoading(false);
      setError(
        "Hubo un problema al agendar el turno. Por favor, intenta de nuevo."
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al agendar el turno. Por favor, intenta de nuevo.",
      });
    }
  };

  // Obtener la fecha actual en formato YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  if (!user || !user.id) {
    return (
      <div className="error-container">
        <h1>Acceso Denegado</h1>
        <p>Necesitas estar logueado para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="new-appointment-container">
      <div className="new-appointment-text">
        <h1>Agendar Nuevo Turno</h1>
        <h2>Por favor, llena el siguiente formulario para agendar un turno.</h2>
        <p>*Recuerda que los horarios de atencion son de 8 a 18hs.*</p>
      </div>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={todayDate} // Establece la fecha mínima
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Hora</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Agendando..." : "Agendar Turno"}
        </button>
      </form>
    </div>
  );
};

export default NewAppointment;
