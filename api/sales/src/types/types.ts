// Libs
import { Logger } from "winston";

// Declare
declare global {
  namespace Express {
    export interface Request {
      logger: Logger;
    }
  }
}

// Sales API
export interface _ProductInSale {
  amount: number;
  productId: string;
  unitPrice: number;
}

export interface _Sales {
  totalPrice: number;
  responsibleId: number;
  organizationId: number;
  products: _ProductInSale[];
}

// Basic response
export interface BasicResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}
