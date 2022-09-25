// Libs
import helmet from "helmet";
import { Logger } from "winston";
import { createServer } from "https";

import CertModel from "@cert";
import ServerModel from "@models/serverModel";

// Classes
class HTTPSServer extends ServerModel {
  private static HTTPSPORT = process.env.HTTPSPORT || 443;

  public static startServer(logger: Logger): void {
    logger.info("Starting the HTTPS server...");

    const cert = new CertModel(logger);
    const server = createServer(
      {
        key: cert.getKey(),
        cert: cert.getCert(),
      },
      this.getApp(
        helmet()
      )
    );
    server.listen(this.HTTPSPORT, () => {
      logger.info(`The HTTPS server is online on port: ${this.HTTPSPORT}`);
    });
  }
}

// Code
export default HTTPSServer;
