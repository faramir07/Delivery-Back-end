import db from "../../models";

export const alldeliveryUser = async () => {  
  const allUserDelivery = await db.UserDelivery.findAll();
  if (allUserDelivery) {
    return { allUserDelivery };
  } else {
    throw new Error("Error al cargar los usuarios");
  }
};

export const deliveryId = async (deliveryId: string) => {
  const delivery = await db.UserDelivery.findByPk(deliveryId);
  if(delivery){
    return delivery
  }else throw new Error("usuario no existe")
}
