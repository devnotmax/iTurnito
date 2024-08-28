// import { useEffect, useState } from "react";
// import Turno from "../../components/turno/Turno";
// import "./MisTurnos.css";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addAppointments } from "../../redux/reducer";
// import NotFound from "../../components/NotFound/NotFound";

// const MisTurnos = () => {
//   const user = useSelector((state) => state.userActive);
//   const appointments = useSelector((state) => state.userAppointments) || [];
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/users/${user.id}`
//       );
//       dispatch(addAppointments(response.data.appointments));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (!user.name) {
//       navigate("/");
//     } else {
//       fetchData();
//     }
//   }, []);

//   return (
//     <>
//       <div className="turnsContainer">
//         <h1>Mis Turnos <i class='bx bx-calendar'></i></h1>
//         <div className="cards-container">
//           {appointments.length > 0 ? (
//             appointments.map((turno) => (
//               <Turno
//                 key={turno.id}
//                 id={turno.id}
//                 date={turno.date}
//                 time={turno.time}
//                 status={turno.status}
//                 description={turno.description}
//               />
//             ))
//           ) : (
//             <>
//             <NotFound />
//             <p>No hay turnos registrados</p>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MisTurnos;
import { useEffect, useState } from "react";
import Turno from "../../components/turno/Turno";
import "./MisTurnos.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAppointments } from "../../redux/reducer";
import NotFound from "../../components/NotFound/NotFound";

const MisTurnos = () => {
  const user = useSelector((state) => state.userActive);
  const appointments = useSelector((state) => state.userAppointments) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${user.id}`
      );
      dispatch(addAppointments(response.data.appointments));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user.name) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [user, navigate]);

  return (
    <div className="turnsContainer">
      <h1>
        Mis Turnos <i className="bx bx-calendar"></i>
      </h1>
      <div className="cards-container">
        {appointments.length > 0 ? (
          appointments.map((turno) => (
            <Turno
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
              description={turno.description}
            />
          ))
        ) : (
          <>
            <NotFound />
            <p>No hay turnos registrados</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MisTurnos;
