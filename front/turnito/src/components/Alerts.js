import Swal from "sweetalert2";

export const successAlert = () => {
  Swal.fire({
    title: "¡Registro Exitoso!",
    text: "El usuario se ha registrado correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    title: "Error en el Registro",
    text: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

export const loginSuccess = () => {
  Swal.fire({
    title: "¡Login Exitoso!",
    text: "El usuario se ha logueado correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export const loginError = (message) => {
  Swal.fire({
    title: "Error en el Login",
    text: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};
