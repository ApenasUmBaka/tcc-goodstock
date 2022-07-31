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
    const findProductResult = await ProductModel.findProduct(req.logger, {
      organizationId: params.organizationId,
      name: params.name,
    });

    if (findProductResult) {
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

  public async getProduct(req: Request, res: Response) {
    // Check if the organization Id is valid.
    const organizationId = toNumber(req.params.organizationId);
    if (!organizationId) {
      req.logger.info(
        "The provided organization id is not valid. Returning..."
      );
      return res.sendStatus(400);
    }

    // Check if the product id is valid.
    const findProductResult = await ProductModel.findProduct(req.logger, {
      _id: req.params.productId,
      organizationId: organizationId
    });

    if (!findProductResult) {
      req.logger.info(
        "The products provided id doesn't not exist. Returning..."
      );
      return res.status(400).json({
        status: "Error",
        message: "The provided id doesn't not exist.",
      });
    }

    req.logger.info('The product exists. Returning..');
    return res.status(200).json({
      status: 'Success',
      data: findProductResult
    });
  }
}

// Code
export default ProductsController;
