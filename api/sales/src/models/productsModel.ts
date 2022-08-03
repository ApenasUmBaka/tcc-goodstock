// Libs
import { Logger } from "winston";
import axios, { AxiosResponse, AxiosError } from "axios";

import { Product } from "@types";

// Classes
/**
 * A class to manipulate all connections to the products API.
 */
class ProductsModel {
  private logger: Logger;
  private organizationId: string;
  private apiKey = process.env.PRODUCTS_API_AUTH;

  constructor(logger: Logger, organizationId: string) {
    this.logger = logger;
    this.organizationId = organizationId;
  }

  /**
   * A method to set a new value to the amount of some product on the products API.
   */
  public async setProductAmount(
    productId: string,
    newAmount: number
  ): Promise<any> {
    this.logger.info(
      `Setting a new amount to the product #${this.organizationId}/${productId}`
    );
    const product = await this.getProduct(productId);

    // Check if the res obtained success.
    if (!product) throw "The product was not returned.";

    // Change the amount value.
    product.amount = newAmount;
  }

  /**
   * A method to get some product from the Product API.
   */
  public async getProduct(productId: string): Promise<Product | undefined> {
    const res = await this.request("GET", productId);

    // Check if the res obtained success.
    if (!res) return;

    return res.data;
  }

  /**
   * A method to update a product in the product API.
   */
  public async patchProduct(
    productId: string,
    newProduct: Product
  ): Promise<Product | undefined> {
    const res = await this.request("PATCH", productId, newProduct);

    if (!res) {
      this.logger.info("The product was not updated.");
      return;
    }

    this.logger.info("The product was updated.");
    return res.data;
  }

  /**
   * A method to communicate with the Product API.
   */
  private async request(method: string, productId: string, data?: any) {
    this.logger.info("Doing a request to the organizations api...");

    // Do the request to the API.
    let response: AxiosResponse;
    const route = `http://goodstock_api_customers:3002/products/${this.organizationId}${productId}`;

    try {
      response = await axios.request({
        method: method,
        url: route,
        data: data,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    } catch (err) {
      const error: AxiosError = err as any;

      // Check if the request was completed.
      if (!error.response) {
        this.logger.error(
          `The connection to the Organizations API was not completed. Error: ${err}`
        );
        return;
      }
      response = error.response;
    }

    // Check if the request was successfully.
    if (response.data.status == "Error") {
      this.logger.info(
        `The request has returned the status "Error". Message: ${response.data.message}`
      );
      return;
    }

    this.logger.info("The request was successfully completed.");
    return response.data;
  }
}

export default ProductsModel;
