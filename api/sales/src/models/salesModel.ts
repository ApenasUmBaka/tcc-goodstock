// Libs
import { Logger } from "winston";

import { Sale } from "@types";
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
      this.logger.info('The sale was searched in the database.');
      return result;
    } catch (err) {
      this.logger.warn(
        `Couldn\'t search the sale in the database. Error: ${err}`
      );
      return;
    }
  }

  public async createSale(sale: Sale): Promise<Sale | undefined> {
    try {
      this.logger.info('Creating new sale...');
      const result = await this.model.create(sale);
      this.logger.info('The sale has been successfully created.');
      return (result as any);
    } catch (err) {
      this.logger.warn(
        `Couldn\'t create a sale in the database. Error: ${err}`
      );
      return;
    }
  }
}

// Code
export default SalesModel;
