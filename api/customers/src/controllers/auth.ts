// Libs
import LoggerFactory from "@logger";
import { NextFunction, Request, Response } from "express";

// Classes
class AuthController {
  public authRequest(req: Request, res: Response, next: NextFunction) {
    req.logger = LoggerFactory.createLogger(req.ip);
    req.logger.info(`Request on endpoint: ${req.method} ${req.url}`);

    req.logger.info("Checking auth...");
    const apiKey = `Bearer ${process.env.API_AUTH}`;
    if (req.header("authorization") == apiKey) {
      req.logger.info("Credential is valid.");
      return next();
    }

    req.logger.info("The credential is invalid. Returning response...");
    res.status(401).json({
      status: "error",
      message: "Invalid credential.",
    });
  }
}

// Code
export default AuthController;
