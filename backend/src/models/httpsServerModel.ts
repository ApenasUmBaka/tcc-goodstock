// Libs
import helmet from "helmet";
import { Logger } from "winston";
import bodyParser from "body-parser";
import { createServer } from "https";
import session from "express-session";
import express, { Express } from "express";

import router from "@router";
import CertModel from "@cert";

// Classes
class HTTPSServer {
  private logger: Logger;
  private HTTPSPORT = process.env.HTTPSPORT || 443;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  private createApp(): Express {
    this.logger.info("Configuring app instance...");

    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set("trust-proxy", true);
    app.set("view engine", "ejs");
    app.set("views", "src/views/pages");

    app.use(helmet({
      crossOriginEmbedderPolicy: false,
    }));
    app.use(
      session({
        secret: process.env.SESSIONSECRET!,
        cookie: { secure: true },
        saveUninitialized: false,
        resave: true,
      })
    );
    app.use(router);

    return app;
  }

  public createHTTPSServer() {
    const cert = new CertModel(this.logger);
    const server = createServer(
      {
        key: cert.getKey(),
        cert: cert.getCert(),
      },
      this.createApp()
    );
    server.listen(this.HTTPSPORT, () => {
      this.logger.info(`The HTTPS server is online on port: ${this.HTTPSPORT}`);
    });
  }
}

// Code
export default HTTPSServer;
