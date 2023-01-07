import db from "../../models";
import { PoingType } from "../../types/interfaceService";

export const registrationService = async (
  typepayment: string,
  typeservice: string,
  value: number,
  poing: PoingType[],
  userid: string
) => {
  if (typepayment && typeservice && value && poing && userid) {
    const profitDelivery = value - 500;

    const userAdmin = await db.UserAdmin.findByPk(userid);
    const userClient = await db.UserAdmin.findByPk(userid);

    let columFkey: "userASer_id" | "userCSer_id";
    if (userAdmin) {
      columFkey = "userASer_id";
    } else if (userClient) {
      columFkey = "userCSer_id";
    } else return "usuario no registrado";
    console.log("campoa registrar", columFkey);

    try {
      const transaction = await db.sequelize.Transaction();

      await db.Services.create(
        {
          value: value,
          typepayment: typepayment,
          typeservice: typeservice,
          profit: profitDelivery,
          [columFkey]: userid,
        },
        { transaction }
      );

      await db.StateServices.create(poing, {
        transaction,
      });

      await db.transaction.commit();
      return "servicio registrado con exito";
    } catch (error: any) {
      await db.transaction.rollback();
      return "error al registar servicio";
    }
  } else return "campo requerido";
};
