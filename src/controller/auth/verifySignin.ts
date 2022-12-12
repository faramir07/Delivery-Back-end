import db from "../../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from "./config";

// verificacion de usuarios y responde con un token/null ----------------------------
const UserControler = (user: any, password: string, secret: string) => {
  if (!user) throw new Error("Email y Contraceña Invalidos");
  if (user.state !== "active")
    throw new Error(
      "Tu cuenta está inactiva, revisa tu email para activar la cuanta o comunícate con soporte técnico"
    );
  const compareBcrypt = bcrypt.compareSync(password, user.password);
  if (!compareBcrypt) throw new Error("Email y Contraceña Invalidos");
  return jwt.sign({ id: user.id }, secret, { expiresIn: 8640 });
};

// login de los admins ------------------------------------------
export const signinAdmin = async (password: string, email: string) => {  
  const validateUserAdmin = await db.UserAdmin.findOne({
    where: {
      email: email,
    },
  });

  const result = UserControler(validateUserAdmin, password, secret);

  if (result) {
    const updateuserAdmin = await validateUserAdmin.update({ login: true });
    await updateuserAdmin.save();
    return {
      id: validateUserAdmin.id,
      firstname: validateUserAdmin.firstname,
      lastname: validateUserAdmin.lastname,
      email: validateUserAdmin.email,
      rol: validateUserAdmin.rol,
      accessToken: result,
    };
  } else throw new Error("Email y Contraceña Invalidos");
};

// login de los clientes ------------------------------------------
export const signinClient = async (password: string, email: string) => {
  const validateUserClient = await db.UserClient.findOne({
    where: {
      email: email,
    },
  });

  const result = UserControler(validateUserClient, password, secret);

  if (result) {
    const updateuserClient = await validateUserClient.update({ login: true });
    await updateuserClient.save()
    return {
      id: validateUserClient.id,
      firstname: validateUserClient.firstname,
      lastname: validateUserClient.lastname,
      email: validateUserClient.email,
      rol: validateUserClient.rol,
      accessToken: result,
    };
  } else throw new Error("Email y Contraceña Invalidos");
};

// login de los deliveris ------------------------------------------
export const signinDelivery = async (
  password: string,
  email: string,
  base: number
) => {  
  const validateUserDelivery = await db.UserDelivery.findOne({
    where: {
      email: email,
    },
  });

  const result = UserControler(validateUserDelivery, password, secret);

  if (result) {
    if (base) {
      const updateuserDelivery = await validateUserDelivery.update({ login: true, base: base });
      await updateuserDelivery.save();
    } else throw new Error("La base es requerida");
    return {
      id: validateUserDelivery.id,
      firstname: validateUserDelivery.firstname,
      lastname: validateUserDelivery.lastname,
      email: validateUserDelivery.email,
      rol: validateUserDelivery.rol,
      accessToken: result,
    };
  } else throw new Error("Email y Contraceña Invalidos");
};
