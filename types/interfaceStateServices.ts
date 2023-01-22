// tipo de modelo sql Stateservice
export interface StateServicesModelType {
  id: string;
  checkinput: boolean;
  checkoutput: boolean;
  evidence: boolean;
  address: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// tipo de res estado del servicio
export interface StateSericeResType {
  checkinput: boolean;
  checkoutput: boolean;
  evidence: boolean;
  address: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
