import db from "../../models";
import { ClientModelType } from "../../types/interfaceClient";
import { AdminModelType } from "../../types/interfaceModerator";
import { PoingType } from "../../types/interfaceService";

// registra un nuevo servicio
export const registrationService = async (
  typepayment: string,
  typeservice: string,
  value: number,
  poing: PoingType[],
  clientId: string,
  adminId: string
) => {
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
