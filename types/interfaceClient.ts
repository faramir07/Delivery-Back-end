
// tipo de modelo sql cliente
export type StatetypeClient = "active" | "inactive";
export interface ClientModelType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  state: StatetypeClient;
  age: number;
  rol: "client";
  ci: number;
  phome: number;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de cliente Res para el admin.admin
export interface ClientResAdminType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  state: StatetypeClient;
  age: number;
  rol: "client";
  ci: number;
  phome: number;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de cliente put por el admin o moderador
export interface ClientPutType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  state: StatetypeClient;
  age: number;
  ci: number;
  phome: number;
}

// tipo de cliente Res para Moderador
export interface ClientResAdminModeradorType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  state: StatetypeClient;
  rol: "client";
  phome: number;
}

// tipo de cliente Res para el delivery
export interface ClienteResDeliveryType {
  firstname: string;
  lastname: string;
  rol: "client";
  phome: number;
}