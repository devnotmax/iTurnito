import { Request, Response } from "express";
import {
  createNewUser,
  returnAllUsers,
  returnUserById,
  findUserByCredentialId,
} from "../services/usersServices";
import {
  createCredentials,
  validateCredentials,
} from "../services/credentialsServices";
import { User } from "../entities/User";
import { UserModel } from "../config/data-source";

//OBTENER TODOS LOS USUARIOS
const getUser = async (req: Request, res: Response) => {
  try {
    const users = await returnAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//OBTENER UN USUARIO POR SU ID
const getUserbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user: User | null = await returnUserById(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "ERROR AL OBTENER USUARIO" });
    console.log(req.params);
  }
};

//REGISTRAR UN NUEVO USUARIO
// const registerUser = async (req: Request, res: Response) => {
//   const { name, username, email, birthdate, nDni, password } = req.body;

//   //Hacemos una validación de campos (req.body) en el body de la petición

//   if (!name || !username || !email || !birthdate || !nDni || !password) {
//     return res.status(400).json({ error: "Todos los campos son obligatorios" });
//   }

//   const existingUser = await UserModel.findOne({
//     where: [{ username }, { email }],
//   });

//   if (existingUser) {
//     return res.status(409).json({ error: "El nombre de usuario o correo ya existe en nuestra base de datos" });
//   }

//   //Implementamos try/catch
//   try {
//     const newUser = await createNewUser(
//       name,
//       username,
//       email,
//       birthdate,
//       nDni,
//       password
//     );
//     const newCredentials = await createCredentials(username, password);
//     newUser.credentials = newCredentials;
//     res.status(201).json("Usuario creado con exito");
//   } catch (error) {
//     console.error("Error al crear un nuevo usuario:", error);
//     res.status(500).json({ error: "Error al crear un nuevo usuario" });
//   }
// };
const registerUser = async (req: Request, res: Response) => {
  const { name, username, email, birthdate, nDni, password } = req.body;

  if (!name || !username || !email || !birthdate || !nDni || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya existe" });
    }

    const newUser = await createNewUser(
      name,
      username,
      email,
      birthdate,
      nDni,
      password
    );

    res.status(201).json("Usuario creado con éxito");
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    res.status(500).json({ error: "Error al crear un nuevo usuario" });
  }
};

//INICIAR SESION
const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const credential = await validateCredentials(username, password);
    const user = await findUserByCredentialId(credential.id);
    res.status(200).json({
      mensage: "Sesion iniciada con exito",
      user: user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getUser, getUserbyId, registerUser, loginUser };
