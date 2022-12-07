// Libs
import { Logger } from "winston";
import { NextFunction, Request, Response } from "express";

// Declare
declare module "express-session" {
  interface SessionData {
    user: User;
    microsoftRegister: boolean;
  }
}
declare module "express-session" {
  interface Store {
    user: User;
  }
}

declare global {
  namespace Express {
    export interface Request {
      logger: Logger;
    }
  }
}

// Interfaces
/**
 * Type used to defined a user in the current session.
 */
export interface User {
  id?: number;
  name?: string;
  email?: string;
  organizationName?: string;
  organizationId?: number;
}

/**
 * A interface to describe a product's structure.
 */
export interface Product {
  name: string;
  price: number;
  amount: number;
  organizationId: number;
  created_at?: Date;
  updated_at?: Date;
}

// Requests
/**
 * Interface used to describe the request received from POST /register.
 */
export interface RequestRegisterUserRegisterOrg {
  name: string;
  email: string;
  passwd: string;
  masterPassword: string;
  organizationName: string;
  registerAccountRegisterOrganization: "Cadastrar";
}

/**
 * Interface used to describe the request received from POST /login.
 */
export interface RequestRegisterUserLoginOrg {
  name: string;
  email: string;
  passwd: string;
  masterPassword: string;
  organizationId: string;
}

// Response
/**
 * Interface used to describe the default response from the api.
 */
export interface APIResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}

/**
 * Interface used to describe the user response to be sent to the client.
 * All the interfaces starting with "Client" are client-friendly.
 */
export interface ClientUser {
  id: number;
  name: string;
  email: string;
  organizationId: number;
}

/**
 * Interface used to describe the organization response to be sent to the client.
 * All the interfaces starting with "Client" are client-friendly.
 */
export interface ClientOrganization {
  id: number;
  name: string;
}

// Query
/**
 * Interface used as query in the POST /customer from the Customers API.
 */
export interface RequestCustomer {
  name: string;
  email: string;
  password: string;
  organizationId: number;
}
