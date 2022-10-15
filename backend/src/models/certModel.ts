// Libs
import path from "path";
import * as fs from "fs";

import { Logger } from "winston";

// Classes
class CertModel {
  private logger: Logger;
  private keyPath: string = path.join("certs", "key.pem");
  private certPath: string = path.join("certs", "cert.pem");

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to get the key from https.
   */
  public getKey(): Buffer | undefined {
    this.logger.info("Reading the key file...");

    if (!fs.existsSync(this.keyPath)) {
      this.logger.error("The key path is not valid.");
      return;
    }
    return fs.readFileSync(this.keyPath);
  }

  /**
   * A method to get the cert from https.
   */
  public getCert(): Buffer | undefined {
    this.logger.info("Reading the cert file...");

    if (!fs.existsSync(this.certPath)) {
      this.logger.error("The cert path is not valid.");
      return;
    }
    return fs.readFileSync(this.certPath);
  }
}

// Code
export default CertModel;
