import express, { Router } from 'express';
import { getallAppointments, getAppointmentsbyId, createAppointment, cancelAppointment } from '../controllers/appointmentController';

const router: Router = express.Router();

// GET /appointments => obtener todos los appointments
//GET  /appointment => obtener el detalle de un turno en especifico
//POST /appointment/schedule => crear un turno
//PUT /appointment/cancel => actualizar/cancelar un turno

router.get("/", getallAppointments); // ruta: /appointments
router.get("/:id", getAppointmentsbyId); // ruta: /appointments/:id
router.post("/schedule", createAppointment); // ruta: /appointments/schedule
router.put("/cancel/:id", cancelAppointment); // ruta: /appointments/cancel



export default router;
