// Libs
import { Logger } from "winston";

import Database from "./databaseModel";
import productsSchema from "./schemas/productsSchema";
import { Product } from "@types";

// Data
abstract class ProductsModel {
  public static model = Database.mongoose.model("products", productsSchema);

  /**
   * A method to find products using query.
   */
  public static async findProducts(logger: Logger, query: any): Promise<Product[] | undefined> {
    try {
      const findProductResult = await this.model.find(query);

      if (!findProductResult.length) {
        logger.info("The products was not found in the database.");
        return;
      }

      logger.info("The products was found in the database.");
      return findProductResult as any;
    } catch (err) {
      logger.error(`Error on getting a product in the database. Error: ${err}`);
      return;
    }
  }

  public static async findProduct(logger: Logger, query: any): Promise<Product | undefined> {
    try {
      const findProductResult = await this.model.findOne(query);

      if (!findProductResult) {
        logger.info("The product was not found in the database.");
        return;
      }

      logger.info("The product was found in the database.");
      return findProductResult as any;
    } catch (err) {
      logger.error(`Error on getting a product in the database. Error: ${err}`);
      return;
    }
  }

  public static async updateProduct(logger: Logger, query: any, update: any) {
    logger.info("Updating product...");

    try {
      const updatedProduct = await this.model.findOneAndReplace(query, update);

      logger.info("The product was successfully updated.");
      return updatedProduct;
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
