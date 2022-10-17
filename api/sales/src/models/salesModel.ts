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
    this.logger.info('Creating new sale...');
    try {
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

  public async deleteSale(saleId: string): Promise<string> {
    this.logger.info('Trying to delete a sale...');

    const sale = await this.getSale(saleId);
    if (!sale) {
      this.logger.info('The sale was not found.');
      return 'Sale not found';
    }

    try {
      await this.model.deleteOne({
        _id: saleId
      });
      this.logger.info('The sale has been deleted.');
      return '';
    } catch (err) {
      this.logger.warn(`Wasn't possible to delete the sale. Error: ${err}`);
      return 'Internal server error.';
    }
  }
}

// Code
export default SalesModel;
