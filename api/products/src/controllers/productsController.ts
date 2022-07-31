// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import ProductModel from "@models/productsModel";
import OrganizationsModel from "@models/organizationsModel";

// Classes
/**
 * A products controller.
 */
class ProductsController {
  /**
   * POST /products
   * A route to create a new product.
   */
  public async postProducts(req: Request, res: Response) {
    // Check params.
    const neededParams = ["name", "price", "organizationId"];
    const params = Security.filterParamsOptional(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.sendStatus(400);
    }

    if (!toNumber(params.price) || !toNumber(params.organizationId)) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.sendStatus(400);
    }

    // Check if the organization exists.
    const findOrganizationResult = await OrganizationsModel.getOrganization(
      req.logger,
      params.organizationId
    );
    if (!findOrganizationResult) {
      req.logger.info("The provided organization doesn't exists. Returning...");
      return res.sendStatus(400);
    }

    // Check if the product already exists.
    const findProductResult = await ProductModel.findProducts(req.logger, {
      organizationId: params.organizationId,
      name: params.name,
    });

    if (findProductResult.length == 1) {
      req.logger.info("A product with this name already exists. Returning...");
      return res.sendStatus(400);
    }

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
      return res.sendStatus(500);
    }
  }

  /**
   * GET /products/:organizationId/:productId
   * A method to create a new product.
   */
  public async getProduct(req: Request, res: Response) {
    // Check if the organization Id is valid.
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.sendStatus(400);
    }

    let query: any = {
      _id: req.params.productId,
      organizationId: organizationId
    };

    if (!req.params.productId) {
      query = {
        organizationId: organizationId
      }
    }

    // Check if the product id is valid.
    const findProductResult = await ProductModel.findProducts(req.logger, query);

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.sendStatus(400);
    }

    req.logger.info('The product exists. Returning..');
    return res.status(200).json({
      status: 'Success',
      data: findProductResult
    });
  }

  /**
   * PATCH /product/:organizationId/:productId
   * A method to update a product.
   */
  public async patchProduct(req: Request, res: Response) {
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.sendStatus(400);
    }

    const query = {
      _id: req.params.productId,
      organizationId: organizationId
    };

    // Check if the product id is valid.
    const findProductResult = await ProductModel.findProducts(req.logger, query);

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.sendStatus(400);
    }

    const updatedProduct = await ProductModel.updateProduct(req.logger, query, req.body);

    if (!updatedProduct) {
      req.logger.info('The product was not updated. Returning...');
      return res.sendStatus(400);
    }

    req.logger.info('The product was updated. Returning...');
    return res.status(200).json({
      status: 'Success',
      data: updatedProduct
    });
  }

  /**
   * DELETE /product/:organizationId/:productId
   * A method to delete a product.
   */
  public async deleteProduct(req: Request, res: Response) {
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
      organizationId: organizationId
    };
    const findProductResult = await ProductModel.findProducts(req.logger, query);

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.sendStatus(400);
    }

    // Delete the product.
    const deletedProduct = await ProductModel.deleteProduct(req.logger, query);
    if (!deletedProduct) {
      req.logger.info('The product was not deleted. Returning...');
      return res.sendStatus(500);
    }

    req.logger.info('The product was successfully deleted. Returning...');
    return res.sendStatus(200);

  }
}

// Code
export default ProductsController;
