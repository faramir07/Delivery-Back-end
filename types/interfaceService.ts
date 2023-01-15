import { DeliveryModelType, DeliveryResService } from "./interfaceDelivery";
import {
  StateSericeResType,
  StateServicesModelType,
} from "./interfaceStateServices";

// tipo de modelo sql servicio
export type Statetype = "pending" | "assigned" | "cancelled" | "finished";
export type TypePaymentType = "cash" | "transfer";
export type TypeServiceType = "going" | "round trip";

export interface ServiceModelType {
  id: string;
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  state: Statetype;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
  userASer_id?: string | null;
  userCSer_id?: string | null;
  userDSer_id?: string | null;
}

// tipo de put por el admin, moderador y cliente
export type PoingType = {
  address: string;
  description: string;
  stateSer_id?: string;
};

export interface ServicePutType {
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  clientId: string;
  adminId: string;
  poing: PoingType[];
}

//tipo de res servicio para asignar
export interface serviceToAssignType {
  id: string;
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  state: Statetype;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
  userASer_id?: string | null;
  userCSer_id?: string | null;
  userDSer_id?: string | null;
  StateServices: StateSericeResType[];
}

//tipo de sql servicio/estado con delivery
export interface ServiceStateDeliveryModelType {
  id: string;
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  state: Statetype;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
  userASer_id?: string;
  userCSer_id?: string;
  userDSer_id?: string;
  StateServices: StateServicesModelType[];
  UserDelivery: DeliveryModelType;
}

//tipo de res servicio/estado con delivery

export interface ServiceStateDeliveryResType {
  id: string;
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  state: Statetype;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
  userASer_id?: string | null;
  userCSer_id?: string | null;
  userDSer_id?: string | null;
  StateServices: StateSericeResType[];
  UserDelivery: DeliveryResService;
}
