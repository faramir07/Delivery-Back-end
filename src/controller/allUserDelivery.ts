import db from "../../models";

export const deliveryUser = async (idAdmin: string) => {
  const setUserAdmin = await db.UserAdmin.findByPk(idAdmin);
  if (setUserAdmin.rol == "admin") {
    const allUserDelivery = await db.findAll();
    if (allUserDelivery) {
      return { allUserDelivery };
    } else {
      throw new Error("Error al cargar los usuarios");
    }
  } else throw new Error("Error de autenticacion");
};
