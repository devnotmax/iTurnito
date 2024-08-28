import Icredentials from "../interfaces/Icredentials";
import { AppDataSource, CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credentials";

const createCredentials = async (
  username: string,
  password: string
): Promise<Credential> => {
  const existingCredential = await CredentialModel.findOne({
    where: { username },
  });
  if (existingCredential) {
    throw new Error("Username already exists");
  }

  const newCredentials = CredentialModel.create({
    username: username,
    password: password,
  });

  const results = await CredentialModel.save(newCredentials);
  return results;
};

const validateCredentials = async (
  username: string,
  password: string
): Promise<Icredentials> => {
  const credential = await CredentialModel.findOneBy({ username: username });
  if (!credential) {
    throw new Error("No existe el username");
  } else if (credential.password !== password) {
    throw new Error("La contraseña no coincide");
  } else {
    return credential;
  }
};

export { createCredentials, validateCredentials };
