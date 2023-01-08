
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
}

// tipo de put por el admin, moderador y cliente
export type PoingType = {
  address: string;
  description: string;
  stateSer_id?: string
}

export interface ServicePutType {
  value: number;
  typepayment: TypePaymentType;
  typeservice: TypeServiceType;
  poing: PoingType[];
}


