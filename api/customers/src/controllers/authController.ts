// Libs
import { NextFunction, Request, Response } from 'express';

import LoggerFactory from '@logger';

// Classes
class AuthController {
  public static auth(req: Request, res: Response, next: NextFunction) {
    req.logger = LoggerFactory.createLogger(req.ip);
    req.logger.info(`Request on endpoint: ${req.method} ${req.url}`);
    next();
  }
}

// Code
export default AuthController;
