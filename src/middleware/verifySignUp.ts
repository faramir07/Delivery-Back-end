import { Request, Response, NextFunction } from "express";
import db from "../../models";

// client
export const checkEmailclient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password, address, age, ci, phome } =
    req.body;

  // valida campo requeridos
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !age ||
    !ci ||
    !phome
  ) {
    res.status(401).send({ msg: "Error! Campo requerido" });
    return;
  }

  //valida email duplicado
  const setclient = await db.UserClient.findOne({ where: { email: email } });
  if (setclient) {
    res.status(400).send({ msg: "Este email ya esta en uso" });
    return;
  }
  next();
};

// delivery
export const checkEmailDelivery = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    age,
    ci,
    phome,
    imagename,
    image,
    imagetype,
  } = req.body;

  // valida campo requeridos
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !age ||
    !ci ||
    !phome ||
    !imagename ||
    !image ||
    !imagetype
  ) {
    res.status(401).send({ msg: "Error! Campo requerido" });
    return;
  }

  //valida email duplicado
  const setDelivery = await db.UserDelivery.findOne({
    where: { email: email },
  });
  if (setDelivery) {
    res.status(400).send({ msg: "Este email ya esta en uso" });
    return;
  }

  Next();
};

// admin
export const checkEmailAndRolAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password, age, ci, phome, rol } =
    req.body;
  // valida campo requeridos
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !age ||
    !ci ||
    !phome ||
    !rol
  ) {
    res.status(401).send({ msg: "Error! Campo requerido" });
    return;
  }

  // valida cantidad de usuarios admin hasta 2 usuarios
  const setAdminRol = await db.UserAdmin.findAll({
    where: { rol: rol },
  });
  if (setAdminRol.length >= 2 && setAdminRol[0].rol === "admin") {
    res.status(418).send({ msg: "no pueden existir mas de 2 admin" });
    return;
  }

  //valida email duplicado
  const setAdminEmail = await db.UserAdmin.findOne({
    where: { email: email },
  });
  if (setAdminEmail) {
    res.status(400).send({ msg: "Este email ya esta en uso" });
    return;
  }

  next();
};
