import { Request, Response, NextFunction } from "express";
import db from "../../models";
import bcrypt from "bcrypt";

const controllerBcrypt = (userpass: string, password: string) => {
  return bcrypt.compareSync(password, userpass);
};

// login cliente ------------------------------------
export const checkLoginClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const validateUserClient = await db.UserClient.findOne({
    where: {
      email: email,
    },
  });

  // valida si el usuario existe
  if (!validateUserClient) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  const compareBcrypt = controllerBcrypt(validateUserClient.password, password);

  // valida password
  if (!compareBcrypt) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  // valida estado de la cuenta
  if (validateUserClient.state !== "active") {
    res.status(403).send({
      msg: "Tu cuenta está inactiva o bloqueada, revisa tu email para activar la cuanta o comunícate con soporte técnico",
    });
    return;
  }

  next();
};

// login delivery ------------------------------------
export const checkLoginDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, base } = req.body;

  const validateUserDelivery = await db.UserDelivery.findOne({
    where: {
      email: email,
    },
  });

  // valida si el usuario existe
  if (!validateUserDelivery) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  const compareBcrypt = controllerBcrypt(
    validateUserDelivery.password,
    password
  );

  // valida password
  if (!compareBcrypt) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  // valida estado de la cuenta
  if (validateUserDelivery.state !== "active") {
    res.status(403).send({
      msg: "Tu cuenta está inactiva o bloqueada, revisa tu email para activar la cuanta o comunícate con soporte técnico",
    });
    return;
  }

  // valida base delivery
  if (base === undefined || base < 50000) {
    res
      .status(401)
      .send({ msg: "deves poseer una base de por lo menos de 50 mil" });
    return;
  }

  next();
};

// login admin ----------------------------------------------
export const checkLoginadmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const validateUserAdmin = await db.UserAdmin.findOne({
    where: {
      email: email,
    },
  });

  //valida si el usuario existe
  if (!validateUserAdmin) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  const compareBcrypt = controllerBcrypt(validateUserAdmin.password, password);

  // valida password
  if (!compareBcrypt) {
    res.status(404).send({ msg: "email y contraceña incorrecta" });
    return;
  }

  // valida estado de la cuenta
  if (validateUserAdmin.state !== "active") {
    res.status(403).send({
      msg: "Tu cuenta está inactiva o bloqueada, revisa tu email para activar la cuanta o comunícate con soporte técnico",
    });
    return;
  }

  next();
};
