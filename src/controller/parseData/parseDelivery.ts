import {
  DeliveryResAdminType,
  DeliveryModelType,
  DeliveryResAdminModeradorType,
  DeliveryResClientType,
} from "../../../types/interfaceDelivery";

// se pasean los datos delivery para Admin.Admin
export const parseAdminDelivery = (
  delivery: DeliveryModelType[] | DeliveryModelType
) => {
  if (Array.isArray(delivery)) {
    const deliveryModel: DeliveryResAdminType[] = delivery.map(
      (delivery: DeliveryModelType) => {
        return {
          id: delivery.id,
          firstname: delivery.firstname,
          lastname: delivery.lastname,
          email: delivery.email,
          address: delivery.address,
          state: delivery.state,
          age: delivery.age,
          ci: delivery.ci,
          rol: delivery.rol,
          phome: delivery.phome,
          base: delivery.base,
          login: delivery.login,
          createdAt: delivery.createdAt,
          updatedAt: delivery.updatedAt,
        };
      }
    );
    return deliveryModel;
  } else
    return {
      id: delivery.id,
      firstname: delivery.firstname,
      lastname: delivery.lastname,
      email: delivery.email,
      address: delivery.address,
      state: delivery.state,
      age: delivery.age,
      ci: delivery.ci,
      rol: delivery.rol,
      phome: delivery.phome,
      base: delivery.base,
      login: delivery.login,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
};

// se pasean los datos delivery para Admin.Moderador
export const parseModeratorDelivery = (
  delivery: DeliveryModelType[] | DeliveryModelType
) => {
  if (Array.isArray(delivery)) {
    const deliveryModel: DeliveryResAdminModeradorType[] = delivery.map(
      (delivery: DeliveryModelType) => {
        return {
          id: delivery.id,
          firstname: delivery.firstname,
          lastname: delivery.lastname,
          email: delivery.email,
          state: delivery.state,
          rol: delivery.rol,
          phome: delivery.phome,
          base: delivery.base,
          login: delivery.login,
          createdAt: delivery.createdAt,
          updatedAt: delivery.updatedAt,
        };
      }
    );
    return deliveryModel;
  } else
    return {
      id: delivery.id,
      firstname: delivery.firstname,
      lastname: delivery.lastname,
      email: delivery.email,
      state: delivery.state,
      rol: delivery.rol,
      phome: delivery.phome,
      base: delivery.base,
      login: delivery.login,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
};

// se parsean los datos delivery para cliente
export const parseClientDelivery = (delivery: DeliveryModelType) => {
  const deliveryModel: DeliveryResClientType = {
    id: delivery.id,
    firstname: delivery.firstname,
    lastname: delivery.lastname,
    rol: delivery.rol,
    phome: delivery.phome,
    login: delivery.login,
  };
  return deliveryModel;
};
