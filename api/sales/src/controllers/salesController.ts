// Libs
import { Request, Response } from "express";

import Security from "@security";
import SalesModel from "@models/salesModel";
import ValidatorController from "@controllers/validatorController";

// Classes
class SalesController {
  /*
    A route to get a sale.
    /sales/:id
  */
  public static async getSale(req: Request, res: Response) {
    // Check params
    const saleId = req.params.saleId;
    if (!saleId) {
      req.logger.info("The provided sale id is not valid. Returning...");
      return res.sendStatus(400);
    }

    // Get in the database the sale.
    req.logger.info("Getting the sale using the provided ID...");
    const salesModel = new SalesModel(req.logger);
    const saleResult = await salesModel.getSale(saleId);

    if (!saleResult) {
      req.logger.info("The provided sale was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Sale not found.",
      });
    }

    req.logger.info("The provided sale was successfully found. Returning...");
    return res.status(200).json({
      status: "Success",
      data: saleResult,
    });
  }

  /**
   * A method to create a new sale.
   */
  public static async postSale(req: Request, res: Response) {
    const neededParams = [
      "totalPrice",
      "responsibleId",
      "organizationId",
      "soldProducts",
    ];
    if (Security.filterParams(neededParams, req.body)) {
      req.logger.info("Some params was not included. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Some params was not send.",
      });
    }

    // Check if the params are valid.
    req.logger.info("Checking if the sale is valid...");
    if (!ValidatorController.isSaleValid(req.body)) {
      req.logger.info("Some param was not valid.");
      return res.status(400).json({
        status: "Error",
        message: "Some params has not a valid type.",
      });
    }
    req.logger.info("The provided sale is valid.");

    req.logger.info("Creating a new sale...");
    const saleModel = new SalesModel(req.logger);
    const result = await saleModel.createSale(req.body);

    if (!result) {
      req.logger.info(`Couldn't create the new sale. Returning...`);
      return res.status(500).json({
        status: "Error",
        message: "Internal error server.",
      });
    }

    req.logger.info("The sale was created. Returning...");
    return res.status(500).json({
      status: "Success",
      data: result,
    });
  }

  /**
   * A method to delete some sale.
   * /sale/:id
   */
  public static async deleteSale(req: Request, res: Response) {
    if (!req.query.saleId) {
      req.logger.info("The sale ID was not provided. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Sale ID not provided.",
      });
    }

    const saleModel = new SalesModel(req.logger);
    const result = await saleModel.deleteSale(req.query.saleId as string);
    if (result) {
      req.logger.info("The sale was not deleted. Returning...");
      return res.status(400).json({
        status: "Error",
        message: result,
      });
    }
  }
}

// Code
export default SalesController;
