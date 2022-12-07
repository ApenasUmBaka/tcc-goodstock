// Libs
import { Request, Response } from "express";

import Security from "@security";
import ProductsModel from "@models/productsModel";

// Classes
class ProductsController {
  /**
   * GET /products/:productId
   * A method to get some product.
   */
  public static async getProductById(req: Request, res: Response) {
    // Check if user is authenticated.
    if (!req.session.user) {
      req.logger.info("User not logged. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "User not authenticated.",
      });
    }

    // Check the param.
    if (!req.params.productId) {
      req.logger.info("Invalid product id. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Invalid product id.",
      });
    }

    // Search by the product.
    const productsModel = new ProductsModel(
      req.logger,
      req.session.user!.organizationId!
    );
    const productResult = await productsModel.searchById(req.params.productId);

    // Return the result.
    if (typeof productResult == "string") {
      req.logger.info(
        `Product not found. Error: ${productResult}. Returning...`
      );
      return res.status(404).json({
        status: "Error",
        message: "Produto não encontrado.",
      });
    }

    req.logger.info("Product found. Returning...");
    res.status(200).json({
      status: "Success",
      data: productResult,
    });
  }

  /**
   * GET /products/
   * A method to get some products.
   */
  public static async getProductsByQuery(req: Request, res: Response) {
    // Check if user is authenticated.
    if (!req.session.user) {
      req.logger.info("User not logged. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "User not authenticated.",
      });
    }

    // Check the param.
    if (!Object.keys(req.body)) {
      req.logger.info("Invalid query. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Invalid query.",
      });
    }

    // Search by the products.
    const productsModel = new ProductsModel(
      req.logger,
      req.session.user!.organizationId!
    );
    const productsResult = await productsModel.searchByQuery(req.body);

    // Return the result.
    if (typeof productsResult == "string") {
      req.logger.info(
        `Products not found. Error: ${productsResult}. Returning...`
      );
      return res.status(404).json({
        status: "Error",
        message: "Produtos não encontrados.",
      });
    }

    req.logger.info("Products found. Returning...");
    res.status(200).json({
      status: "Success",
      data: productsResult,
    });
  }

  /**
   * POST /products/
   * A method to create a product.
   */
  public static async postProduct(req: Request, res: Response) {
    // Check if user is authenticated.
    if (!req.session.user) {
      req.logger.info("User not logged. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "User not authenticated.",
      });
    }

    // Check the param.
    const neededParams = ["name", "price", "amount", "details"];
    const params = Security.filterParams(neededParams, req.body);
    if (!params) {
      req.logger.info("Invalid product. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Invalid product.",
      });
    }

    // Create the product.
    const productsModel = new ProductsModel(
      req.logger,
      req.session.user!.organizationId!
    );
    const productResult = await productsModel.create(params);

    // Return the result.
    if (typeof productResult == "string") {
      req.logger.info(
        `The product was not created. Error: ${productResult}. Returning...`
      );
      return res.status(400).json({
        status: "Error",
        message: `Produto não criado devido o erro: ${productResult}.`,
      });
    }

    req.logger.info("Products found. Returning...");
    res.status(200).json({
      status: "Success",
      data: productResult,
    });
  }

  /**
   * PATCH /products/:productId
   * A method to update some product.
   */
  public static async patchProduct(req: Request, res: Response) {
    // Check if user is authenticated.
    if (!req.session.user) {
      req.logger.info("User not logged. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "User not authenticated.",
      });
    }

    // Check the param.
    const neededParams = ["name", "price", "amount", "?details"];
    const params = Security.filterParams(neededParams, req.body);
    if (!Object.keys(params) || !req.params.productId) {
      req.logger.info("Invalid product. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Invalid product.",
      });
    }

    // Update the product.
    const productsModel = new ProductsModel(
      req.logger,
      req.session.user!.organizationId!
    );
    const productResult = await productsModel.updateById(
      req.params.productId,
      params
    );

    // Return the result.
    if (typeof productResult == "string") {
      req.logger.info(
        `Product not updated. Error: ${productResult}. Returning...`
      );
      return res.status(400).json({
        status: "Error",
        message: "Produto não atualizado.",
      });
    }

    req.logger.info("Product updated. Returning...");
    res.status(200).json({
      status: "Success",
      data: productResult,
    });
  }

  /**
   * DELETE /products/:productId
   * A method to delete some product.
   */
  public static async deleteProduct(req: Request, res: Response) {
    // Check if user is authenticated.
    if (!req.session.user) {
      req.logger.info("User not logged. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "User not authenticated.",
      });
    }

    // Check the param.
    if (!req.params.productId) {
      req.logger.info("Invalid product. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Invalid product.",
      });
    }

    // Delete the product.
    const productsModel = new ProductsModel(
      req.logger,
      req.session.user!.organizationId!
    );
    const productResult = await productsModel.deleteById(req.params.productId);

    // Return the result.
    if (typeof productResult == "string") {
      req.logger.info(
        `Product not deleted. Error: ${productResult}. Returning...`
      );
      return res.status(400).json({
        status: "Error",
        message: "Produto não deletado.",
      });
    }

    req.logger.info("Product deletado. Returning...");
    res.status(200).json({
      status: "Success",
      data: null,
    });
  }
}

// Code
export default ProductsController;
