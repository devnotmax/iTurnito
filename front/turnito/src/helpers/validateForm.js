// validationHelpers.js

export const validateForm = (formData) => {
  const { name, email, birthdate, nDni, username, password } = formData;
  const errors = {};

  // Validación de nombre
  if (!name) errors.name = "El nombre es requerido.";

  // Validación de email
  if (!email) errors.email = "El email es requerido.";

  // Validación de fecha de nacimiento
  // if (!birthdate) {
  //   errors.birthdate = "La fecha de nacimiento es requerida.";
  // } else {
  //   const birthDateObj = new Date(birthdate);
  //   const currentDate = new Date();
  //   const age = currentDate.getFullYear() - birthDateObj.getFullYear();
  //   const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();
  //   if (
  //     monthDifference < 0 ||
  //     (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())
  //   ) {
  //     age--;
  //   }
  //   if (age < 18) {
  //     errors.birthdate = "Debes ser mayor de edad para registrarte.";
  //   }
  // }
  if (!birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida.";
  } else {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();

    // Ajuste de la edad si el mes actual es antes del mes de nacimiento
    // o si es el mismo mes pero el día actual es antes del día de nacimiento
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      errors.birthdate = "Debes ser mayor de edad para registrarte.";
    }
  }

  // Validación de número de DNI
  const nDniRegex = /^[0-9]{1,8}$/;
  if (!nDni) {
    errors.nDni = "El número de DNI es requerido.";
  } else if (!nDniRegex.test(nDni)) {
    errors.nDni = "El número de DNI debe ser un número de máximo 8 dígitos.";
  }

  // Validación de nombre de usuario
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!username) {
    errors.username = "El nombre de usuario es requerido.";
  } else if (!usernameRegex.test(username)) {
    errors.username =
      "El nombre de usuario solo puede contener letras y números.";
  }

  // // Validación de contraseña
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!password) {
    errors.password = "La contraseña es requerida.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres y contener mayúsculas, minúsculas, números y símbolos.";
  }

  return errors;
};

export const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateLoginForm = (formData) => {
  const { username, password } = formData;
  const errors = {};

  if (!username) errors.username = "El nombre de usuario es requerido.";
  if (!password) errors.password = "La contraseña es requerida.";

  return errors;
};
