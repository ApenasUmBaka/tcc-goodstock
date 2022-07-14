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
export interface _Customer {
  id: number;
  email: string;
  password: string;
  fk_organizationId: number;
}

export interface _Organization {
  id: number;
  organizationName: string;
  password: string;
}
