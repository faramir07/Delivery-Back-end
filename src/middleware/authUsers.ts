import { Request, Response, NextFunction } from "express";
import db from "../../models";
import secret from "../controller/auth/config";
import jwt from "jsonwebtoken";

// autenticacion Admin
export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded && typeof decoded === "object") {
      const setUserAdmin = await db.UserAdmin.findByPk(decoded.id);
      if (setUserAdmin && setUserAdmin.rol === "admin") {
        next();
      } else {
        res.status(401).send({ msg: "No autorizado" });
      }
    }
  } catch (error: any) {
    console.log(error.expiredAt);
    res.status(401).send({ msg: "sesion a caducado vuelva a iniciar sesion" });
  }
};

// autenticacion Moderador
export const authModerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded && typeof decoded === "object") {
      const setUserAdmin = await db.UserAdmin.findByPk(decoded.id);
      if (setUserAdmin && setUserAdmin.rol === "moderator") {
        next();
      } else {
        res.status(401).send({ msg: "No autorizado" });
      }
    }
  } catch (error: any) {
    console.log(error.expiredAt);
    res.status(401).send({ msg: "sesion a caducado vuelva a iniciar sesion" });
  }
};

// autenticacion delivery
export const authDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded && typeof decoded === "object") {
      const setUserAdmin = await db.UserDelivery.findByPk(decoded.id);
      if (setUserAdmin && setUserAdmin.rol === "delivery") {
        next();
      } else {
        res.status(401).send({ msg: "No autorizado" });
      }
    }
  } catch (error: any) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }
};

// autenticacion  Cliente
export const authClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded && typeof decoded === "object") {
      const setUserAdmin = await db.UserClient.findByPk(decoded.id);
      if (setUserAdmin && setUserAdmin.rol === "client") {
        next();
      } else {
        res.status(401).send({ msg: "No autorizado" });
      }
    }
  } catch (error: any) {
    res.status(403).send({ msg: "token requerido" });
    return;
  }
};
