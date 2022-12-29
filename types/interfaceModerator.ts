
// tipo de modelo sql moderador
export type StateTypeAdmin = "active" | "locked" | "inactive";
export type Roltype = "admin" | "moderator";
export interface AdminModelType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  state: StateTypeAdmin;
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
  state: StateTypeAdmin;
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
  state: StateTypeAdmin;
  age: number;
  ci: number;
  phome: number;
  rol: Roltype;
}