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
    return { msg: "Registro Exitoso"};
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
  if (
    firstname &&
    lastname &&
    email &&
    password &&
    address &&
    age &&
    ci &&
    phome
  ) {
    const setclient = await db.UserClient.findOne({ where: { email: email } });
    if (setclient) throw new Error("Este email ya esta registrado");

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
  } else throw new Error("Error al crear usuario campo requerido");
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
  if (
    firstname &&
    lastname &&
    email &&
    password &&
    address &&
    age &&
    ci &&
    phome &&
    imagename &&
    image &&
    imagetype
  ) {
    const setDelivery = await db.UserDelivery.findOne({
      where: { email: email },
    });
    if (setDelivery) throw new Error("Este email ya esta registrado");

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
  } else throw new Error("Error al crear usuario campo requerido");
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
  if (firstname && lastname && email && password && age && ci && phome && rol) {
    const setAdminRol = await db.UserAdmin.findAll({
      where: { rol: rol },
    });
    
    if (setAdminRol.length >= 2 && setAdminRol[0].rol === "admin")
      throw new Error("no pueden existir mas de 2 administradores");

    const setAdmin = await db.UserAdmin.findOne({
      where: { email: email },
    });
    if (setAdmin) throw new Error("Este email ya esta registrado");

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
  } else throw new Error("Error al crear usuario campo requerido");
};
