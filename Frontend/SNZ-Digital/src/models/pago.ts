export interface PagoRequest {
    amount: string;
    currency: string;
    description: string;
  }
  
  export interface PagoResponse {
    id: string;
    status: string;
    paymentUrl: string;
  }
  