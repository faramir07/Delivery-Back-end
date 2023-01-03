import { ClientModelType, ClientPutType } from "../../../types/interfaceClient";
import { parceAdminClient } from "../parseData/parseClient";
import db from "../../../models";
import { Op } from "sequelize";

// busca todos los clientes
export const allClietUser = async () => {
  const allUserClient: ClientModelType[] = await db.UserClient.findAll();

  if (allUserClient) {
    const allClientParse = parceAdminClient(allUserClient);
    return allClientParse;
  } else return "usuario no exite";
};

// busca un cliente por id
export const clientId = async (clientid: string) => {
  if (!clientid) return "el id es requerido";
  const clientIdDb: ClientModelType = await db.UserClient.findByPk(clientid);

  if (clientIdDb) {
    const clientIdParse = parceAdminClient(clientIdDb);
    return [clientIdParse];
  } else return "usuario no existe";
};

// busca un cliente por nombre
export const clientName = async (firstname: string) => {
  const name = firstname.replace(/['"]+/g, "");
  if (!name) return "nombre requerido";
  const clientName: ClientModelType[] = await db.UserClient.findAll({
    where: {
      firstname: {
        [Op.iLike]: "%" + name + "%",
      },
    },
  });

  if (clientName.length > 0) {
    const clientNameParse = parceAdminClient(clientName);
    return clientNameParse;
  } else return "usuario no existe";
};

// actulizar los datos del cliente
export const clientUpdate = async (clientData: ClientPutType) => {
  const clientPerId = await clientId(clientData.id);

  if (typeof clientPerId === "string")
    return clientPerId + " para realizar la actualizacion de los datos";

  const { firstname, lastname, email, address, state, age, ci, phome } =
    clientData;

  const updateClient = await db.UserClient.update(
    { firstname, lastname, email, address, state, age, ci, phome },
    {
      where: {
        id: clientData.id,
      },
    }
  );

  return updateClient;
};
