// tipo de modelo sql delivery
export type StateTypeDelivery = "active" | "pending" | "locked" | "inactive";
export interface DeliveryModelType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  state: StateTypeDelivery;
  age: number;
  ci: number;
  rol: "delivery";
  phome: number;
  base: number;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de Delivery Res para el admin.admin
export interface DeliveryResAdminType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  state: StateTypeDelivery;
  age: number;
  ci: number;
  rol: "delivery";
  phome: number;
  base: number;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de delivery put por el admin o moderador
export interface DeliveryPutType {
  id: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  state?: StateTypeDelivery;
  phome?: number;
  email?: string;
}

// tipo de Delivery Res para Moderador
export interface DeliveryResAdminModeradorType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  state: StateTypeDelivery;
  rol: "delivery";
  phome: number;
  base: number;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de Delivery Res para el Cliente
export interface DeliveryResClientType {
  id: string;
  firstname: string;
  lastname: string;
  rol: "delivery";
  phome: number;
  login: boolean;
}

// tipo de Delivery Res para servicio
export interface DeliveryResService {
  id: string;
  firstname: string;
  lastname: string;
  rol: "delivery";
  phome: number;
  base: number;
  login: boolean;
}
