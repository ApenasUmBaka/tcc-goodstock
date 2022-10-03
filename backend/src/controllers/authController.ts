// Libs
import { NextFunction, Request, Response } from "express";

import LoggerFactory from "@logger";

// Classes
class AuthController {
  public static authRequest(req: Request, res: Response, next: NextFunction) {
    req.logger = LoggerFactory.createLogger(req.ip);
    req.logger.info(`Request on endpoint: ${req.method} ${req.url}`);

    req.logger.info("Creating new session...");
    if (!req.session.user) {
      req.session.user = {
        email: undefined,
        organizationId: undefined,
      };
    }

    next();
  }
}

// Code
export default AuthController;
