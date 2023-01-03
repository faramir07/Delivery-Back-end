import { Request, Response, NextFunction } from "express";
import db from "../../models";
import secret from "../controller/auth/config";
import * as jwt from "jsonwebtoken";

interface DecodedTokenType {
  header: jwt.JwtHeader;
  payload: jwt.JwtPayload | string;
  signature: string;
}

// autenticacion Admin
export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.status(403).send({ error: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret, {
      complete: true,
    }) as DecodedTokenType;

    if (decoded && typeof decoded.payload === "object") {
      const setUserAdmin = await db.UserAdmin.findByPk(decoded.payload.id);
      if (setUserAdmin && setUserAdmin.rol === "admin") {
        next();
      } else {
        res.status(401).send({ error: "No autorizado" });
      }
    }
  } catch (error: any) {
    console.log(error);
    res
      .status(401)
      .send({ error: "sesion a caducado vuelva a iniciar sesion" });
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
    res.status(403).send({ error: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret, {
      complete: true,
    }) as DecodedTokenType;
    if (decoded && typeof decoded.payload === "object") {
      const setUserAdmin = await db.UserAdmin.findByPk(decoded.payload.id);
      if (setUserAdmin && setUserAdmin.rol === "moderator") {
        next();
      } else {
        res.status(401).send({ error: "No autorizado" });
      }
    }
  } catch (error: any) {
    console.log(error);
    res
      .status(401)
      .send({ error: "sesion a caducado vuelva a iniciar sesion" });
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
    res.status(403).send({ error: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret, {
      complete: true,
    }) as DecodedTokenType;
    if (decoded && typeof decoded.payload === "object") {
      const setUserAdmin = await db.UserDelivery.findByPk(decoded.payload.id);
      if (setUserAdmin && setUserAdmin.rol === "delivery") {
        next();
      } else {
        res.status(401).send({ error: "No autorizado" });
      }
    }
  } catch (error: any) {
    res.status(403).send({ error: "token requerido" });
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
    res.status(403).send({ error: "token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret, {
      complete: true,
    }) as DecodedTokenType;
    if (decoded && typeof decoded.payload === "object") {
      const setUserAdmin = await db.UserClient.findByPk(decoded.payload.id);
      if (setUserAdmin && setUserAdmin.rol === "client") {
        next();
      } else {
        res.status(401).send({ error: "No autorizado" });
      }
    }
  } catch (error: any) {
    res.status(403).send({ error: "token requerido" });
    return;
  }
};
