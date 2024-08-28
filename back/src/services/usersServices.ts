import { createCredentials } from "./credentialsServices";
import { AppDataSource, UserModel } from "../config/data-source";
import { User } from "../entities/User";

let nextId: number = Math.floor(Math.random() * 1000);

const returnAllUsers = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: ["appointments", "credentials"],
  });
  return users;
};

const returnUserById = async (id: number): Promise<User | null> => {
  const user = await UserModel.findOne({
    where: { id: id },
    relations: ["appointments"], // Asegúrate de incluir la relación aquí
  });
  return user;
};

// const createNewUser = async (
//   name: string,
//   username: string,
//   email: string,
//   birthdate: Date,
//   nDni: number,
//   password: string
// ) => {

//   // Crear el nuevo usuario
//   const user = UserModel.create({
//     name: name,
//     username: username,
//     email: email,
//     birthdate: birthdate,
//     nDni: nDni,
//     password: password,
//     credentials: await createCredentials(username, password),
//   });

//   const results = await UserModel.save(user);
//   return results;
// };
const createNewUser = async (
  name: string,
  username: string,
  email: string,
  birthdate: Date,
  nDni: number,
  password: string
) => {
  const user = UserModel.create({
    name,
    username,
    email,
    birthdate,
    nDni,
    password,
  });

  const newCredentials = await createCredentials(username, password);
  user.credentials = newCredentials;

  return await UserModel.save(user);
};

const findUserByCredentialId = async (
  credentialId: number
): Promise<User | null> => {
  const user: User | null = await UserModel.findOneBy({
    credentials: { id: credentialId },
  });
  return user;
};

// INICIAR SESION

export {
  returnAllUsers,
  returnUserById,
  createNewUser,
  findUserByCredentialId,
};
