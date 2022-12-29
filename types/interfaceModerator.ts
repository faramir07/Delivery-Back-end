
// tipo de modelo sql moderador
export type Statetype = "active" | "locked" | "inactive";
export type Roltype = "admin" | "moderator";
export interface UserAdminModelType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  state: Statetype;
  age: number;
  ci: number;
  phome: number;
  rol: Roltype;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de moderador Res para el admin
export interface MoreratorResAdminType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  state: Statetype;
  age: number;
  ci: number;
  phome: number;
  rol: Roltype;
  login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de moderador put por el admin.
export interface ModeratorPutType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  state: Statetype;
  age: number;
  ci: number;
  phome: number;
  rol: Roltype;
}