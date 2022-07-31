// Libs
import { Logger } from "winston";

import Database from "./databaseModel";
import productsSchema from "./schemas/productsSchema";

// Data
abstract class ProductsModel {
  public static model = Database.mongoose.model("products", productsSchema);

  public static async findProduct(logger: Logger, query: any) {
    try {
      const findProductResult = await this.model.findOne(query);

      if (!findProductResult) {
        logger.info("The product was not found in the database.");
        return;
      }

      logger.info("The product was found in the database.");
      return findProductResult;
    } catch (err) {
      logger.error(`Error on getting a product in the database. Error: ${err}`);
      return;
    }
  }
}

// Code
export default ProductsModel;
