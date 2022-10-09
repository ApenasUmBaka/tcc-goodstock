// Libs
import { Logger } from "winston";
import bodyParser from "body-parser";
import session from "express-session";
import express, { Express } from "express";

import router from "@router";
import { ExpressMiddleware } from "@types";


// Classes
export abstract class ServerModel {
  public startServer(logger: Logger): void {}

  protected static getApp(helmetMiddleware: ExpressMiddleware): Express {
    const app = express();
    
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("trust-proxy", true);
    
    app.use(helmetMiddleware);
    app.use(
      session({
        secret: process.env.SESSIONSECRET!,
        cookie: { secure: true },
        saveUninitialized: false,
        resave: true
      })
    );
    app.use(router);

    return app;
  }
}

// Code
export default ServerModel;
