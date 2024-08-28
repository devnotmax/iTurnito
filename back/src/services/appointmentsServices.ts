import {
  AppointmentModel,
  AppDataSource,
  UserModel,
} from "../config/data-source";
import Appointment, { AppointmentStatus } from "../entities/Appointments";
import { User } from "../entities/User";

let nextId: number = 2;

const returnAllAppointmentsServices = async () => {
  const appointments = await AppointmentModel.find();
  return appointments;
};

const returnAppointmentByIdServices = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = await AppointmentModel.findOneBy({ id: id });
  return appointment;
};

// const createAppointmentServices = async (
//   date: Date,
//   time: string,
//   user: number
// ) => {
//   if (!user) {
//     throw new Error("No puede haber un turno sin ID de usuario");
//   }

//   const newAppointment: Appointment = AppointmentModel.create({
//     id: nextId++,
//     date: date,
//     time: time,
//     user: user,
//   });

//   const results = await AppointmentModel.save(newAppointment);
//   return results;
// };
// const createAppointmentServices = async (
//   date: Date,
//   time: string,
//   userId: number
// ) => {
//   const user = await UserModel.findOneBy({ id: userId });

//   if (!user) {
//     throw new Error("No se encontró el usuario con el ID especificado");
//   }

//   const newAppointment: Appointment = AppointmentModel.create({
//     id: nextId++,
//     date: date,
//     time: time,
//     user: user,
//   });

//   const results = await AppointmentModel.save(newAppointment);
//   return results;
// };
const createAppointmentServices = async (
  date: Date,
  time: string,
  userId: number,
  description: string
) => {
  //busca al usuario por su ID
  const user = await UserModel.findOneBy({ id: userId });

  if (!user) {
    throw new Error("No se encontró el usuario con el ID especificado");
  }

  const newAppointment: Appointment = AppointmentModel.create({
    id: nextId++,
    date: date,
    time: time,
    user: user,
    description: description,
    status: AppointmentStatus.ACTIVE,
  })

  const results = await AppointmentModel.save(newAppointment);
  return results;
};

const cancelAppointmentServices = async (id: number): Promise<void> => {
  const appointment = await AppointmentModel.findOneBy({ id: id });

  if (!appointment) {
    throw new Error("No se encontró el turno con el ID especificado");
  }

  appointment.status = AppointmentStatus.CANCELLED;

  await AppointmentModel.save(appointment);
};

export {
  returnAllAppointmentsServices,
  returnAppointmentByIdServices,
  createAppointmentServices,
  cancelAppointmentServices,
};
