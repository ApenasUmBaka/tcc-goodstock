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

declare global {
  namespace Express {
    export interface Request {
      logger: Logger;
    }
  }
}

// Types
export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Interface
export interface User {
  id?: number;
  name?: string;
  email?: string;
  organizationId?: number;
}

// Requests
export interface RequestRegisterUserRegisterOrg {
  name: string;
  email: string;
  passwd: string;
  masterPassword: string;
  organizationName: string;
  registerAccountRegisterOrganization: "Cadastrar";
}

export interface RequestRegisterUserLoginOrg {
  name: string;
  email: string;
  passwd: string;
  masterPassword: string;
  organizationId: string;
}

export interface APIResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}

export interface RequestCustomer {
  name: string;
  email: string;
  password: string;
  organizationId: number;
}

// Response
// Customer
export interface ClientUser {
  id: number;
  name: string;
  email: string;
  organizationId: number;
}

// Organization
export interface ClientOrganization {
  id: number;
  name: string;
}
