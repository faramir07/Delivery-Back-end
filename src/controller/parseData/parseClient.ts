import {
  ClientModelType,
  ClientResAdminType,
  ClientResAdminModeradorType,
  ClienteResDeliveryType,
} from "../../../types/interfaceClient";

// se pasean los datos cliente para Admin.Admin
export const parceAdminClient = (
  client: ClientModelType[] | ClientModelType
) => {
  if (Array.isArray(client)) {
    const clientModel: ClientResAdminType[] = client.map(
      (client: ClientModelType) => {
        return {
          id: client.id,
          firstname: client.firstname,
          lastname: client.lastname,
          email: client.email,
          address: client.address,
          state: client.state,
          age: client.age,
          rol: client.rol,
          ci: client.ci,
          phome: client.phome,
          login: client.login,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        };
      }
    );
    return clientModel;
  } else
    return {
      id: client.id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      address: client.address,
      state: client.state,
      age: client.age,
      rol: client.rol,
      ci: client.ci,
      phome: client.phome,
      login: client.login,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
};

// se pasean los datos delivery para Admin.Moderador
export const parseModeratorClient = (
  client: ClientModelType[] | ClientModelType
) => {
  if (Array.isArray(client)) {
    const clientModel: ClientResAdminModeradorType[] = client.map(
      (client: ClientResAdminModeradorType) => {
        return {
          id: client.id,
          firstname: client.firstname,
          lastname: client.lastname,
          email: client.email,
          address: client.address,
          state: client.state,
          rol: client.rol,
          phome: client.phome,
        };
      }
    );
    return clientModel;
  } else {
    return {
      id: client.id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      address: client.address,
      state: client.state,
      rol: client.rol,
      phome: client.phome,
    };
  }
};

// se parsean los datos cliente para delivery
export const parseDeliveryClient = (client: ClientModelType) => {
  const clientModel: ClienteResDeliveryType = {
    firstname: client.firstname,
    lastname: client.lastname,
    rol: client.rol,
    phome: client.phome,
  };
  return clientModel;
};
