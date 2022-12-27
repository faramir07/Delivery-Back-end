import {
  DeliveryModelType,
  DeliveryPutType,
} from "../../../types/interfaceDelivery";
import db from "../../../models";
import { parseAdminDelivery } from "../parseData/parseDelivery";
import { Op } from "sequelize";

// busca todos los delivery
export const allDeliveryUser = async () => {
  const allUserDeliveryDb: DeliveryModelType[] =
    await db.UserDelivery.findAll();
  if (allUserDeliveryDb) {
    const allDeliveryParse = parseAdminDelivery(allUserDeliveryDb);
    return allDeliveryParse;
  } else return "usuario no existe";
};

// busca un delivery por id
export const deliveryId = async (deliveryId: string) => {
  const deliveryIdDb: DeliveryModelType = await db.UserDelivery.findByPk(
    deliveryId
  );
  if (deliveryIdDb) {
    const deliveryIdParse = parseAdminDelivery(deliveryIdDb);
    return deliveryIdParse;
  } else return "usuario no existe";
};

// busca un delivery por name
export const deliveryName = async (firstname: string) => {
  const name = firstname.replace(/['"]+/g, "");
  const deliveryName = await db.UserDelivery.findAll({
    where: {
      firstname: {
        [Op.iLike]: "%" + name + "%",
      },
    },
  });

  if (deliveryName.length > 0) {
    const DeliveryNameParse = parseAdminDelivery(deliveryName);
    return DeliveryNameParse;
  } else return "usuario no existe";
};

// busca los delivery que estan logueados
export const deliveryLogin = async () => {
  const allDeliveryLogin: DeliveryModelType[] = await db.UserDelivery.findAll({
    where: {
      login: "true",
    },
  });

  if (allDeliveryLogin.length > 0) {
    const allDeliveryLoginParse = parseAdminDelivery(allDeliveryLogin);
    return allDeliveryLoginParse;
  } else return "no hay delivery logueados";
};

// actualiza los datos del delivery
export const deliveryUpdate = async (deliveryData: DeliveryPutType) => {
  if (!deliveryData.id) return "id del usuario es requerido";
  const deliveryPerId = await deliveryId(deliveryData.id);
  if (typeof deliveryPerId === "string")
    return deliveryPerId + " para realizar la actualizacion de los datos";

  const { firstname, lastname, address, state, phome, email } = deliveryData;

  const updateDelivery = await db.UserDelivery.update(
    { firstname, lastname, address, state, phome, email },
    {
      where: {
        id: deliveryData.id,
      },
    }
  );

  return updateDelivery;
};
