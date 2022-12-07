import db from "../../models";
import bcrypt from "bcrypt";

const passwordCrypt = async (pass: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(pass, saltOrRounds);
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

    if (newClient) {
      return { msg: "Registro exitoso", newClient };
    } else {
      throw new Error("Error al crear usuario");
    }
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

    const newDeliveryCreate = await newDelivery.addImageEvidences(
      newImgDelivery
    );

    if (newDeliveryCreate) {
      return { msg: "Registro exitoso", newDeliveryCreate };
    } else {
      throw new Error("Error al crear usuario");
    }
  } else throw new Error("Error al crear usuario campo requerido");
};
