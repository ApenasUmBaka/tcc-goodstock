// Libs
import { Logger } from "winston";

import APIModel from "./apiModel";
import { APIResponse, Product } from "@types";

// Classes
class ProductsModel extends APIModel {
  public logger: Logger;
  public url: string = "http://goodstock_api_main:3000/products";
  private organizationId: number;

  constructor(logger: Logger, organizationId: number) {
    super();
    this.logger = logger;
    this.organizationId = organizationId;
  }

  /**
   * A method to create a product using the id.
   * In case of error, the function will return a string containing the error.
   */
  public async create(product: Product): Promise<Product | string> {
    this.logger.info("Creating a new product...");
    product.organizationId = this.organizationId;

    // Do the request to the api.
    const response = await this.callAPI("POST", `/products`, product);
    if (!response) return "Error on communication with some micro-service.";

    // Check if there's some error in the request.
    const resData = response.data as APIResponse;
    if (resData.status == "Error") return resData.message!;

    // Return the product data.
    return resData.data;
  }

  /**
   * A method to get some product using the id.
   * In case of error, the function will return a string containing the error.
   */
  public async searchById(id: string): Promise<Product | string> {
    this.logger.info("Getting a product by his id...");

    // Do the request to the api.
    const url = `/products/${this.organizationId}/${id}`;
    const response = await this.callAPI("GET", url);
    if (!response) return "Error on communication with some micro-service.";

    // Check if there's some error in the request.
    const resData = response.data as APIResponse;
    if (resData.status == "Error") return resData.message!;

    // Return the product data.
    return resData.data;
  }

  /**
   * A method to get some products using the id.
   * In case of error, the function will return a string containing the error.
   */
  public async searchByQuery(query: any): Promise<Product[] | string> {
    this.logger.info("Getting products using query...");

    // Do the request to the api.
    const url = `/products/${this.organizationId}/`;
    const response = await this.callAPI("GET", url, query);
    if (!response) return "Error on communication with some micro-service.";

    // Check if there's some error in the request.
    const resData = response.data as APIResponse;
    if (resData.status == "Error") return resData.message!;

    // Return the product data.
    return resData.data;
  }

  /**
   * A method to update some product using the id.
   * In case of error, the function will return a string containing the error.
   */
  public async updateById(
    id: string,
    product: Product
  ): Promise<Product | string> {
    this.logger.info("Updating a product by his id...");

    // Do the request to the api.
    const url = `/products/${this.organizationId}/${id}`;
    const response = await this.callAPI("PATCH", url, product);
    if (!response) return "Error on communication with some micro-service.";

    // Check if there's some error in the request.
    const resData = response.data as APIResponse;
    if (resData.status == "Error") return resData.message!;

    // Return the product data.
    return resData.data;
  }

  /**
   * A method to delete a product using the id.
   * In case of error, the function will return a string containing the error.
   */
  public async deleteById(id: string): Promise<boolean | string> {
    this.logger.info("Deleting a product by his id...");

    // Do the request to the api.
    const url = `/products/${this.organizationId}/${id}`;
    const response = await this.callAPI("DELETE", url);
    if (!response) return "Error on communication with some micro-service.";

    // Check if there's some error in the request.
    const resData = response.data as APIResponse;
    if (resData.status == "Error") return resData.message!;

    return true;
  }
}

// Code
export default ProductsModel;
