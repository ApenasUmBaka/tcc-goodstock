// Libs
import { Logger } from "winston";

import Database from "./databaseModel";
import productsSchema from "./schemas/productsSchema";

// Data
abstract class ProductsModel {
  public static model = Database.mongoose.model("products", productsSchema);

  public static async findProducts(logger: Logger, query: any): Promise<any[]> {
    try {
      const findProductResult = await this.model.find(query);

      if (!findProductResult) {
        logger.info("The product was not found in the database.");
        return [];
      }

      logger.info("The product was found in the database.");
      return findProductResult;
    } catch (err) {
      logger.error(`Error on getting a product in the database. Error: ${err}`);
      return [];
    }
  }

  public static async updateProduct(logger: Logger, query: any, update: any) {
    logger.info("Updating product...");

    try {
      const updatedProduct = await this.model.findOneAndReplace(query, update);

      logger.info("The product was successfully updated.");
      return this.findProducts(logger, query);
    } catch (err) {
      logger.error(`Couldn't update the product. Error: ${err}`);
      return;
    }
  }

  public static async deleteProduct(logger: Logger, query: any) {
    logger.info("Deleting product...");

    try {
      const deletedproduct = await this.model.findOneAndDelete(query);
      logger.info("The product was successfully deleted.");
      return deletedproduct;
    } catch (err) {
      logger.error(`Couldn't delete the product. Error: ${err}`);
    }
  }
}

// Code
export default ProductsModel;
