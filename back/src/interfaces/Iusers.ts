interface Iusers {
    id: number; // Id numerico que identifica al usuario
    name: string; // Nombre completo del usuario
    email: string; // Direccion de email del usuario
    birthdate: Date; // Fecha de nacimiento.
    nDni: number;   // Numero de DNI o identificacion.
    credentialsId: number; // Id de las credenciales, referencia al par de credenciales que posee el usuario.
}

export default Iusers;