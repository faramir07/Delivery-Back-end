import {
  AdminModelType,
  ModeratorPutType,
} from "../../../types/interfaceModerator";
import { parseAdminModerator } from "../parseData/parseModerator";
import db from "../../../models";
import { Op } from "sequelize";

export const allModeratorUser = async () => {
  const allUserModeratorDb: AdminModelType[] = await db.UserAdmin.findAll({
    where: {
      rol: "moderator",
    },
  });
  if (allUserModeratorDb) {
    const allModeratorParse = parseAdminModerator(allUserModeratorDb);
    return allModeratorParse;
  } else return "usuario no existe";
};

export const moderatorId = async (moderatorId: string) => {
  if (!moderatorId) return "el id es requerido";
  const moderatorDb: AdminModelType[] = await db.UserAdmin.findByPk(
    moderatorId
  );
  if (moderatorDb) {
    const moderatorIdParse = parseAdminModerator(moderatorDb);
    return [moderatorIdParse];
  } else return "usuario no existe";
};

export const moderatorName = async (firstname: string) => {
  const name = firstname.replace(/['"]+/g, "");
  const moderadorName = await db.UserAdmin.findAll({
    where: {
      firstname: {
        [Op.iLike]: "%" + name + "%",
      },
    },
  });
  if (moderadorName.length > 0) {
    const moderatorNameParse = parseAdminModerator(moderadorName);
    return [moderatorNameParse];
  } else return "usuario no existe";
};

export const moderatorLogin = async () => {
  const allModeratorLogin: AdminModelType[] = await db.UserAdmin.findAll({
    where: {
      login: "true",
    },
  });

  if (allModeratorLogin) {
    const allModeratorLoginParse = parseAdminModerator(allModeratorLogin);
    return allModeratorLoginParse;
  } else return "no hay moderadores logueados";
};

export const moderatosUpdate = async (moderatorData: ModeratorPutType) => {
  const moderatorPerId = await moderatorId(moderatorData.id);

  if (typeof moderatorPerId === "string")
    return moderatorPerId + " para realizar la actualizacion de los datos";

  const { firstname, lastname, email, state, age, ci, phome, rol } =
    moderatorData;

  const updateModerator = await db.UserAdmin.update(
    { firstname, lastname, email, state, age, ci, phome, rol },
    {
      where: {
        id: moderatorData.id,
      },
    }
  );

  return updateModerator;
};
