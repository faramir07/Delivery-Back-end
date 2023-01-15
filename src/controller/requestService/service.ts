import { ServicePutType } from "../../../types/interfaceService";
import { ClientModelType } from "../../../types/interfaceClient";
import { AdminModelType } from "../../../types/interfaceModerator";
import db from "../../../models";
import { Op } from "sequelize";
import {
  serviceSatateDeliveryParce,
  serviceToAssignParce,
} from "../parseData/parseService";

// registra un nuevo servicio por admin y moderadores
export const registrationService = async (serviceData: ServicePutType) => {
  const { typepayment, typeservice, value, poing, clientId, adminId } =
    serviceData;

  if (typepayment && typeservice && value && poing && clientId && adminId) {
    const profitDelivery = value - 500;

    const transaction = await db.sequelize.transaction();

    try {
      let columFkey: "userASer_id" | "userCSer_id";

      const clientPerId = await db.UserClient.findByPk(clientId);
      if (clientPerId) {
        return "Cliente no existe";
      }

      const userAdmin: AdminModelType | null = await db.UserAdmin.findByPk(
        adminId
      );
      if (userAdmin) {
        columFkey = "userASer_id";
      } else {
        const userClient: ClientModelType | null = await db.UserClient.findByPk(
          adminId
        );
        if (userClient) {
          columFkey = "userCSer_id";
        } else return "Admin/Moderator no existe";
      }

      const newService = await db.Services.create(
        {
          value: value,
          typepayment: typepayment,
          typeservice: typeservice,
          profit: profitDelivery,
          [columFkey]: adminId,
          userCSer_id: clientId,
        },
        { transaction: transaction }
      );

      if (newService) {
        for (const point of poing) {
          point.stateSer_id = newService.id;
        }
      }

      const newStateService = await db.StateServices.bulkCreate(poing, {
        transaction: transaction,
      });

      await transaction.commit();
      return { newService, newStateService };
    } catch (error: any) {
      console.log(error);
      await transaction.rollback();
      return "error al registar servicio";
    }
  } else return "campo requerido";
};

// servicios en estado pendiente por asignar
export const serviceToAssign = async () => {
  const allServiceToAssign = await db.Services.findAll({
    where: {
      state: "pending",
      userDSer_id: {
        [Op.is]: null,
      },
    },
    include: [
      {
        model: db.StateServices,
        require: true,
      },
    ],
  });

  if (!allServiceToAssign || allServiceToAssign.length < 0)
    return "no hay servicios por asignar";

  const serviceParce = serviceToAssignParce(allServiceToAssign);

  return serviceParce;
};

// servicios/estado asignados con el delivery
export const serviceAssigned = async () => {
  const allServiceAssigned = await db.Services.findAll({
    where: {
      state: "assigned",
      userDSer_id: {
        [Op.ne]: null,
      },
    },
    include: [
      {
        model: db.StateServices,
        require: true,
      },
      {
        model: db.UserDelivery,
        require: true,
      },
    ],
  });

  if (!allServiceAssigned || allServiceAssigned.length < 0)
    return "no hay servicios asignados";

  const serviceParce = serviceSatateDeliveryParce(allServiceAssigned);

  return serviceParce;
};
