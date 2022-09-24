// Libs
import { Logger } from "winston";

import { _Sales } from "@types";
import Database from "@models/databaseModel";
import salesSchema from "@schemas/salesSchema";

// Classes
class SalesModel {
  private logger!: Logger;
  public model = Database.mongoose.model("sales", salesSchema);

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async getSale(saleId: string) {
    try {
      this.logger.info("Searching a sale in the database...");
      const result = await this.model.findById(saleId);
      return result;
    } catch (err) {
      this.logger.warn(
        `Couldn\'t search the sale in the database. Error: ${err}`
      );
      return;
    }
  }
}

// Code
export default SalesModel;
