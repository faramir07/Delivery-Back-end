import db from "../../models";
import * as jwt from "jsonwebtoken";
import secret from "./auth/config";

// se cree un nuevo token
const newToken = (userId: string, secret: string) => {
  const currentTimestamp = Date.now();
  const expirationTimestamp = currentTimestamp + (24 * 60 * 60 * 1000);
  return jwt.sign({ id: userId }, secret, { expiresIn: expirationTimestamp });
};

// login de los admins ------------------------------------------
export const signinAdmin = async (email: string) => {
  const validateUserAdmin = await db.UserAdmin.findOne({
    where: {
      email: email,
    },
  });

  // se actualiza el estado del usuario admin
  const updateuserAdmin = await validateUserAdmin.update({ login: true });
  await updateuserAdmin.save();

  const tokenJwt = newToken(validateUserAdmin.id, secret);

  return {
    id: validateUserAdmin.id,
    firstname: validateUserAdmin.firstname,
    lastname: validateUserAdmin.lastname,
    email: validateUserAdmin.email,
    rol: validateUserAdmin.rol,
    accessToken: tokenJwt,
  };
};

// login de los clientes ------------------------------------------
export const signinClient = async (email: string) => {
  const validateUserClient = await db.UserClient.findOne({
    where: {
      email: email,
    },
  });

  // se actualiza el estado del usuario cliente
  const updateuserClient = await validateUserClient.update({ login: true });
  await updateuserClient.save();

  const tokenJwt = newToken(validateUserClient.id, secret);

  return {
    id: validateUserClient.id,
    firstname: validateUserClient.firstname,
    lastname: validateUserClient.lastname,
    email: validateUserClient.email,
    rol: validateUserClient.rol,
    accessToken: tokenJwt,
  };
};

// login de los deliveris ------------------------------------------
export const signinDelivery = async (email: string, base: number) => {
  const validateUserDelivery = await db.UserDelivery.findOne({
    where: {
      email: email,
    },
  });

  const tokenJwt = newToken(validateUserDelivery.id, secret);

  // se actualiza el estado del usuario delivery
  const updateuserDelivery = await validateUserDelivery.update({
    login: true,
    base: base,
  });
  await updateuserDelivery.save();

  return {
    id: validateUserDelivery.id,
    firstname: validateUserDelivery.firstname,
    lastname: validateUserDelivery.lastname,
    email: validateUserDelivery.email,
    rol: validateUserDelivery.rol,
    accessToken: tokenJwt,
  };
};
