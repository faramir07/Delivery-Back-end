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
    return "Error al crear usuario";
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

  const transaction = await db.sequelize.transaction();

  try {
    const newDelivery = await db.UserDelivery.create(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordCryptDelivery,
        address: address,
        age: age,
        ci: ci,
        phome: phome,
      },
      { transaction: transaction }
    );

    const newImgDelivery = await db.ImageEvidences.create(
      {
        imagename: imagename,
        image: image,
        imagetype: imagetype,
        userDImg_id: newDelivery.id,
      },
      { transaction: transaction }
    );

    await transaction.commit();

    return regitrationRes(newImgDelivery);
  } catch (error: any) {
    console.log(error);
    await transaction.rollback();
    return "error al crear el Delivery";
  }
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
