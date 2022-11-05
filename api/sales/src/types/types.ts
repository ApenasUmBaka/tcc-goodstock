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
export interface ProductInSale {
  amount: number;
  productId: string;
  unitPrice: number;
}

export interface Sale {
  totalPrice: number;
  responsibleId: number;
  organizationId: number;
  soldProducts: {
    [id: string]: ProductInSale;
  };
}

// Basic response
export interface BasicResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}
