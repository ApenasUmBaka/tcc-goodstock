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
// Products
export interface Product {
  _id: string,
  name: string,
  price: number,
  amount: number,
  organizationId: number,
  details: {
    name: string,
    value: string
  }[],
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface PostProduct {
  name: string,
  price: number,
  amount: number,
  organizationId: number,
  details?: {
    name: string,
    value: string
  }[]
}

export interface ClientProduct {
  id: string,
  name: string,
  price: number,
  amount: number,
  organizationId: number,
  details: {
    name: string,
    value: string
  }[],
  createdAt: string,
  updatedAt: string
}