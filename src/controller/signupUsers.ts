import db from "../../models";
import bcrypt from "bcrypt";

// se encripta los password ----------------------------------------------------
const passwordCrypt = async (pass: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(pass, saltOrRounds);
};

//control respuesta de de exito o fallido de registro ------------------------------------
const regitrationRes = (newUser: any) => {
  if (newUser) {
    return { msg: "Registro Exitoso" };
  } else {
    throw new Error("Error al crear usuario");
  }
};

// registro de clientes ---------------------------------------------------------
export const registrationClient = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  address: string,
  age: number,
  ci: number,
  phome: number
) => {
  const passwordCryptCliente = await passwordCrypt(password);

  const newClient = await db.UserClient.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: passwordCryptCliente,
    address: address,
    age: age,
    ci: ci,
    phome: phome,
  });

  return regitrationRes(newClient);
};

type ImagetypeType = "evidence" | "document";

// registro de delivery ------------------------------------------
export const registrationDelivery = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  address: string,
  age: number,
  ci: number,
  phome: number,
  imagename: string,
  image: string,
  imagetype: ImagetypeType
) => {
  const passwordCryptDelivery = await passwordCrypt(password);

  const newDelivery = await db.UserDelivery.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: passwordCryptDelivery,
    address: address,
    age: age,
    ci: ci,
    phome: phome,
  });

  const newImgDelivery = await db.ImageEvidences.create({
    imagename: imagename,
    image: image,
    imagetype: imagetype,
  });

  const relationnewDeliveryCreate = await newDelivery.addImageEvidences(
    newImgDelivery
  );

  return regitrationRes(relationnewDeliveryCreate);
};

// registro de admins ------------------------------------------
export const registrationAdmins = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  age: number,
  ci: number,
  phome: number,
  rol: string
) => {
  const passwordCryptAdmin = await passwordCrypt(password);
  const newAdmin = await db.UserAdmin.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: passwordCryptAdmin,
    age: age,
    ci: ci,
    phome: phome,
    rol: rol,
  });

  return regitrationRes(newAdmin);
};
