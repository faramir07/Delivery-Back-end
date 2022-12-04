import db from "../../models";
import bcrypt from "bcrypt";

export const registration = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  address: string,
  age: number,
  ci: number,
  phome: number
) => {
  const setclient = await db.UserClient.findOne({ where: { email: email } });
  if (setclient) throw new Error("Este email ya esta registrado");

  const saltOrRounds = 10;

  const passwordCrypt = await bcrypt.hash(password, saltOrRounds);

  const newClient = await db.UserClient.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: passwordCrypt,
    address: address,
    age: age,
    ci: ci,
    phome: phome,
  });
  if (newClient) {
    return { msg: "Registro exitoso", newClient };
  } else {
    throw new Error("Error al crear usuario");
  }
};
