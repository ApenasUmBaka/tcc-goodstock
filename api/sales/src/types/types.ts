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

// Customers API
export interface Customer {
  id: number;
  email: string;
  password: string;
  fk_organizationId: number;
}

export interface Organization {
  id: number;
  name: string;
  masterPassword: string;
}

// Products API
export interface Product {
  id: string;
  name: string;
  organizationId: number;
  price: number;
  amount: number;
  [key: string]: any;
}

// Basic response
export interface BasicResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}
