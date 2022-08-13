// Libs
import { Logger } from "winston";

import Database from "@models/databaseModel";
import salesSchema from "@schemas/salesSchema";

// Data
abstract class SalesModel {
  public static model = Database.seq.define("sales", salesSchema);

  public static async getSale(logger: Logger, saleId: number) {
    logger.info('Getting a sale using the provided id...');

    const saleResult = await this.model.findOne({
      where: {
        id: saleId
      }
    });

    if (!saleResult) {
      logger.info('The sale was not found. Returning...');
      return;
    }

    logger.info('The sale was found. Returning...');
    return saleResult;
  }
}

// Code
export default SalesModel;
