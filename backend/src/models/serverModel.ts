// Libs
import express, { Express } from "express";
import { Logger } from "winston";

import router from "@router";
import { _ExpressMiddleware } from "@types";

// Classes
export abstract class ServerModel {
  public startServer(logger: Logger): void {}

  protected static getApp(helmetMiddleware: _ExpressMiddleware): Express {
    const app = express();
    app.set("trust-proxy", true);
    app.use(helmetMiddleware);
    app.use(router);

    return app;
  }
}

// Code
export default ServerModel;
