// import "./Turno.css";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { format } from "date-fns";
// import { cancelAppointmentAction } from "../../redux/reducer";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

// const Turno = ({ id, date, time, userId, status, description }) => {
//   const dispatch = useDispatch();

//   console.log("Turno props:", { id, date, time, userId, status, description });

//   if (!id || !date || !time || !status || !description) {
//     console.error("Missing prop in Turno component");
//     return (
//       <div className="error-message">Información del turno incompleta</div>
//     );
//   }

//   const handleCancelAppointment = async () => {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: "Esta acción no se puede deshacer.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sí, cancelar turno",
//       cancelButtonText: "No, mantener turno",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
//           dispatch(cancelAppointmentAction(id));
//           Swal.fire("Cancelado", "Tu turno ha sido cancelado.", "success");
//         } catch (error) {
//           console.error("Error cancelando el turno:", error);
//           Swal.fire(
//             "Error",
//             "Hubo un problema al cancelar el turno. Inténtalo de nuevo más tarde.",
//             "error"
//           );
//         }
//       }
//     });
//   };

//   const fechaFormateada = format(new Date(date), "dd/MM/yyyy");

//   return (
//     <div className="card">
//       <div className="time">Hora: {time}</div>
//       <div className="date">Fecha: {fechaFormateada}</div>
//       <div className="description">Descripción: {description}</div>
//       <div className={`status ${status === "active" ? "active" : "cancelled"}`}>
//         {status}
//       </div>
//       <button
//         className="cancelButton"
//         disabled={status === "cancelled"}
//         onClick={handleCancelAppointment}
//       >
//         <i className="bx bxs-x-circle"></i> Cancelar turno
//       </button>
//     </div>
//   );
// };

// export default Turno;

import "./Turno.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";
import { cancelAppointmentAction } from "../../redux/reducer";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Turno = ({ id, date, time, userId, status, description }) => {
  const dispatch = useDispatch();

  console.log("Turno props:", { id, date, time, userId, status, description });

  if (!id || !date || !time || !status || !description) {
    console.error("Missing prop in Turno component");
    return (
      <div className="error-message">Información del turno incompleta</div>
    );
  }

  const handleCancelAppointment = async () => {
    const today = new Date();
    const appointmentDate = new Date(date);

    if (differenceInCalendarDays(appointmentDate, today) <= 0) {
      Swal.fire(
        "No se puede cancelar",
        "Los turnos solo pueden ser cancelados hasta el día anterior al día de la reserva.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar turno",
      cancelButtonText: "No, mantener turno",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
          dispatch(cancelAppointmentAction(id));
          Swal.fire("Cancelado", "Tu turno ha sido cancelado.", "success");
        } catch (error) {
          console.error("Error cancelando el turno:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al cancelar el turno. Inténtalo de nuevo más tarde.",
            "error"
          );
        }
      }
    });
  };

  const fechaFormateada = format(new Date(date), "dd/MM/yyyy");

  return (
    <div className="card">
      <div className="time">Hora: {time}</div>
      <div className="date">Fecha: {fechaFormateada}</div>
      <div className="description">Descripción: {description}</div>
      <div className={`status ${status === "active" ? "active" : "cancelled"}`}>
        {status}
      </div>
      <button
        className="cancelButton"
        disabled={status === "cancelled"}
        onClick={handleCancelAppointment}
      >
        <i className="bx bxs-x-circle"></i> Cancelar turno
      </button>
    </div>
  );
};

export default Turno;
