// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import ProductModel from "@models/productsModel";
import ValidatorController from "./validatorController";
import OrganizationsModel from "@models/organizationsModel";

import { Product } from '@types';

// Classes
/**
 * A products controller.
 */
class ProductsController {
  /**
   * A route to create a new product.
   */
  public static async postProduct(req: Request, res: Response) {
    // Check params.
    const neededParams = ["name", "price", "amount", "organizationId"];
    const params = Security.filterParams(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid params.'
      });
    }

    // Check if the request is valid.
    const body: Product = req.body;
    if (!ValidatorController.isValidProduct(body)) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid params.'
      });
    }

    // Check if the organization exists.
    req.logger.info('Checking if the organization exists...');
    const findOrganizationResult = await OrganizationsModel.getOrganization(
      req.logger,
      params.organizationId
    );

    if (!findOrganizationResult) {
      req.logger.info("The provided organization doesn't exists. Returning...");
      return res.status(400).json({
        status: 'Error',
        message: 'Organization not found.'
      });
    }

    // Check if the product already exists.
    req.logger.info('Checking if the product already exists...');
    const findProductResult = await ProductModel.findProduct(req.logger, {
      organizationId: params.organizationId,
      name: params.name,
    });

    if (findProductResult) {
      req.logger.info("A product with this name already exists. Returning...");
      return res.status(400).json({
        status: 'Error',
        message: 'A product with this name already exists.'
      });
    }

    // Create the product.
    req.logger.info("Creating the new product.");
    try {
      const product = await ProductModel.model.create(req.body);
      req.logger.info("the product was created successfully. Returning...");
      return res.status(201).json({
        status: "Success",
        data: product,
      });
    } catch (err) {
      req.logger.error(`Couldn't create the product. Error: ${err}`);
      return res.status(500).json({
        status: 'Error',
        message: 'Internal server error.'
      });
    }
  }

  /**
   * GET /products/:organizationId/:productId
   * A method to create a new product.
   */
  public static async getProduct(req: Request, res: Response) {
    // Check if the organization Id is valid.
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid organization id.'
      });
    }

    const query: any = {
      _id: req.params.productId,
      organizationId: organizationId,
    };

    // Check if the product id is valid.
    const findProductResult = await ProductModel.findProduct(
      req.logger,
      query
    );

    if (!findProductResult) {
      req.logger.info(
        "The provided product's id doesn't not exist. Returning..."
      );
      return res.status(400).json({
        status: 'Error',
        message: 'Product id not found.'
      });
    }

    req.logger.info("The product exists. Returning..");
    return res.status(200).json({
      status: "Success",
      data: findProductResult,
    });
  }

  /**
   * GET /products/:organizationId/
   * A method to get some products.
   */
  public static async getProducts(req: Request, res: Response) {
    // Check if the organization Id is valid.
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.status(400).json({
        status: 'Error',
        message: 'Organization id not found.'
      });
    }

    const query: any = {
      organizationId: organizationId
    };

    // Check if the product id is valid.
    const productsResult = await ProductModel.findProducts(
      req.logger,
      query
    );

    if (!productsResult) {
      req.logger.info(
        "The provided query doesn't returned any product. Returning..."
      );
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid provided query.'
      });
    }

    req.logger.info("The products exists. Returning..");
    return res.status(200).json({
      status: "Success",
      data: productsResult,
    });
  }

  /**
   * PATCH /product/:organizationId/:productId
   * A method to update a product.
   */
  public static async patchProduct(req: Request, res: Response) {
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.sendStatus(400);
    }

    const query = {
      _id: req.params.productId,
      organizationId: organizationId,
    };

    // Check if the product id is valid.
    const findProductResult = await ProductModel.findProduct(
      req.logger,
      query
    );

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.sendStatus(400);
    }

    const updatedProduct = await ProductModel.updateProduct(
      req.logger,
      query,
      req.body
    );

    if (!updatedProduct) {
      req.logger.info("The product was not updated. Returning...");
      return res.sendStatus(400);
    }

    req.logger.info("The product was updated. Returning...");
    return res.status(200).json({
      status: "Success",
      data: updatedProduct,
    });
  }

  /**
   * DELETE /product/:organizationId/:productId
   * A method to delete a product.
   */
  public static async deleteProduct(req: Request, res: Response) {
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.sendStatus(400);
    }

    // Check if the product id is valid.
    const query = {
      _id: req.params.productId,
      organizationId: organizationId,
    };
    const findProductResult = await ProductModel.findProduct(
      req.logger,
      query
    );

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.sendStatus(400);
    }

    // Delete the product.
    const deletedProduct = await ProductModel.deleteProduct(req.logger, query);
    if (!deletedProduct) {
      req.logger.info("The product was not deleted. Returning...");
      return res.sendStatus(500);
    }

    req.logger.info("The product was successfully deleted. Returning...");
    return res.sendStatus(200);
  }
}

// Code
export default ProductsController;
