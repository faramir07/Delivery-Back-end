import jwt from "jsonwebtoken";
import db from "../../../models";
import secret from "./config";

export const authAdmin = async (token: string | undefined) => {
  if (!token) {
    throw new Error("Uuups no se proporciono el token");
  }
  const decoded = jwt.verify(token, secret);
  if (decoded && typeof decoded === "object") {
    const setUserAdmin = await db.UserAdmin.findByPk(decoded.id);
    if (setUserAdmin.rol === "admin") {
      return true
    } else throw new Error("No Autorizado");
  } else throw new Error("No Autorizado");
};
