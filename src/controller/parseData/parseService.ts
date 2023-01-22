import {
  ServiceStateDeliveryModelType,
  ServiceStateDeliveryResType,
  // ServiceDeliveryResType,
  serviceToAssignType,
} from "../../../types/interfaceService";
import { StateSericeResType } from "../../../types/interfaceStateServices";

export const serviceToAssignParce = (
  serviceToAssign: serviceToAssignType[]
) => {
  if (Array.isArray(serviceToAssign)) {
    const serviceToAssignModel: serviceToAssignType[] = serviceToAssign.map(
      (serviceToAssign: serviceToAssignType) => {
        return {
          id: serviceToAssign.id,
          value: serviceToAssign.value,
          typepayment: serviceToAssign.typepayment,
          typeservice: serviceToAssign.typeservice,
          state: serviceToAssign.state,
          profit: serviceToAssign.profit,
          createdAt: serviceToAssign.createdAt,
          updatedAt: serviceToAssign.updatedAt,
          userASer_id: serviceToAssign.userASer_id,
          userCSer_id: serviceToAssign.userCSer_id,
          userDSer_id: serviceToAssign.userDSer_id,
          StateServices: serviceToAssign.StateServices.map(
            (stateService: StateSericeResType) => {
              return {
                checkinput: stateService.checkinput,
                checkoutput: stateService.checkoutput,
                evidence: stateService.evidence,
                address: stateService.address,
                description: stateService.description,
                createdAt: stateService.createdAt,
                updatedAt: stateService.updatedAt,
              };
            }
          ),
        };
      }
    );
    return serviceToAssignModel;
  }
  return serviceToAssign;
};

export const serviceSatateDeliveryParce = (
  serviceSateteDelivery: ServiceStateDeliveryModelType[]
) => {
  if (Array.isArray(serviceSateteDelivery)) {
    const serviceStateDeliveryModel: ServiceStateDeliveryResType[] =
      serviceSateteDelivery.map(
        (serviceSateteDelivery: ServiceStateDeliveryModelType) => {
          return {
            id: serviceSateteDelivery.id,
            value: serviceSateteDelivery.value,
            typepayment: serviceSateteDelivery.typepayment,
            typeservice: serviceSateteDelivery.typeservice,
            state: serviceSateteDelivery.state,
            profit: serviceSateteDelivery.profit,
            createdAt: serviceSateteDelivery.createdAt,
            updatedAt: serviceSateteDelivery.updatedAt,
            userASer_id: serviceSateteDelivery.userASer_id,
            userCSer_id: serviceSateteDelivery.userCSer_id,
            userDSer_id: serviceSateteDelivery.userDSer_id,
            StateServices: serviceSateteDelivery.StateServices.map(
              (StateServices: StateSericeResType) => {
                return {
                  checkinput: StateServices.checkinput,
                  checkoutput: StateServices.checkoutput,
                  evidence: StateServices.evidence,
                  address: StateServices.address,
                  description: StateServices.description,
                  createdAt: StateServices.createdAt,
                  updatedAt: StateServices.updatedAt,
                };
              }
            ),
            UserDelivery: {
              id: serviceSateteDelivery.UserDelivery.id,
              firstname: serviceSateteDelivery.UserDelivery.firstname,
              lastname: serviceSateteDelivery.UserDelivery.lastname,
              rol: serviceSateteDelivery.UserDelivery.rol,
              phome: serviceSateteDelivery.UserDelivery.phome,
              base: serviceSateteDelivery.UserDelivery.base,
              login: serviceSateteDelivery.UserDelivery.login,
            },
          };
        }
      );
    return serviceStateDeliveryModel;
  }
  return serviceSateteDelivery;
};
