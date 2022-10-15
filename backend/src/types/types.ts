// Libs
import { Logger } from "winston";
import { NextFunction, Request, Response } from "express";

// Types
export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Interface
export interface User {
  id: number | undefined;
  email: string | undefined;
  organizationId: number | undefined;
}

export interface RequestRegisterUserBody {
  registerName: string;
  registerEmail: string;
  registerPasswd: string;
  registerOrgId: number;
  registerOrgPasswd: string;
}

export interface APIResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}

// Declare
declare module "express-session" {
  interface SessionData {
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
