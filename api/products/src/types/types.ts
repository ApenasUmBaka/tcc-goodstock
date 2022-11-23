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

// Interfaces
export interface Product {
  id: string,
  name: string,
  price: number,
  amount: number,
  organizationId: number
}
