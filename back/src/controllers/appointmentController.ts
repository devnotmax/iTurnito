import { Request, Response } from "express";
import {
  returnAllAppointmentsServices,
  returnAppointmentByIdServices,
  createAppointmentServices,
  cancelAppointmentServices,
} from "../services/appointmentsServices";
import Appointment from "../entities/Appointments";
import { User } from "../entities/User";

export const getallAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await returnAllAppointmentsServices();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const getAppointmentsbyId = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validar si id es numérico
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  try {
    const appointment: Appointment | null = await returnAppointmentByIdServices(parseInt(id));
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ error: "No se encontro ningun turno con ese ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "ERROR AL OBTENER TURNO" });
  }
};


// export const createAppointment = async (req: Request, res: Response) => {
//   const { date, time, userId, description } = req.body;
//   console.log(req.body);
//   try {
//     const newAppointment = await createAppointmentServices(date, time, userId, description);
//     res.status(201).json(`Turno creado con éxito ${newAppointment}`);
//   } catch (error) {
//     res.status(500).json({ error: "Error al crear un nuevo turno" });
//   }
// };
export const createAppointment = async (req: Request, res: Response) => {
  const { date, time, userId, description } = req.body;
  console.log(req.body);
  try {
    const newAppointment = await createAppointmentServices(date, time, userId, description);
    res.status(201).json(`Turno creado con éxito ${newAppointment}`);
  } catch (error) {
    console.error("Error al crear un nuevo turno:", error);
    res.status(500).json({ error: "Error al crear un nuevo turno. Detalles en el servidor." });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await cancelAppointmentServices(parseInt(id));
    res.status(200).json("Turno cancelado con exito");
  } catch (error) {
    res.status(500).json({ error: "Error al cancelar el turno" });
  }
};
