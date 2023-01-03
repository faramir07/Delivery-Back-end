import db from "../../models";

export const registrationService = async (
  typepayment: string,
  typeservice: string,
  profit: number,
  value: number,
  address: string[],
  userid: string,
  rol: string
) => {
  if (
    typepayment &&
    typeservice &&
    profit &&
    value &&
    address &&
    userid &&
    rol
  ) {
    let newService: any;

    const addService = async (foreignKey: string) => {
      return await db.Services.create({
        typepayment: typepayment,
        typeservice: typeservice,
        profit: profit,
        value: value,
        [foreignKey]: userid,
      });
    };

    if (rol == "admin" || rol == "moderator") {
      newService = await addService("userASer_id");
    } else if (rol == "client") {
      newService = await addService("userCSer_id");
    } else throw new Error("Error al crear servicio acceso denegado");

    address.map(async (obj: string) => {
      const createStateService = await db.StateServices.create({
        address: obj,
      });
      return await newService.addStateServices(await createStateService);
    });

    const resNewService = await db.Services.findOne({
      where: {
        id: newService.id,
      },
      include: {
        model: db.StateServices,
      },
    });

    if (resNewService) {
      return { msg: "registro exitoso", resNewService };
    } else {
      throw new Error("Error al crear servicio");
    }
  } else throw new Error("Error al crear servicio campo requerido");
};
