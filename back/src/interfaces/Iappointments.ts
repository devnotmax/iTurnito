export type status = "active" | "cancelled";

interface Iappointments {
    id: number; //Id numerico que identifica el turno
    date: Date; //Fecha del turno
    time: string; //Hora del turno
    userId: number; //Id del usuario
    status: status; //Estatus del turno
}


export default Iappointments;