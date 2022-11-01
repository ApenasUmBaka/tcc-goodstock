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
// Customers
export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
  fk_organizationId: number;
}

export interface ClientCustomer {
  id: number;
  name: string;
  email: string;
  organizationId: number;
}

export interface PostCustomer {
  name: string;
  email: string;
  password: string;
  organizationId: number;
}

export interface PatchCustomer {
  name?: string;
  email?: string;
  password?: string;
}

export interface FindCustomer {
  id?: number;
  email?: string;
}

// Organizations
export interface Organization {
  id: number;
  name: string;
  masterPassword: string;
}

export interface ReqOrgAuth {
  organizationId?: number;
  organizationPasswd?: string;
}
