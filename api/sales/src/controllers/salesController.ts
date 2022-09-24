// Libs
import { Request, Response } from "express";

import { toNumber } from "@utils";
import SalesModel from "@models/salesModel";

// Classes
class SalesController {
  /*
    A route to get a sale.
    /sales/:id
  */
  public async getSale(req: Request, res: Response) {
    // Check params
    const saleId = req.params.saleId;
    if (!saleId) {
      req.logger.info("The provided sale id is not valid. Returning...");
      return res.sendStatus(400);
    }

    // Get in the database the sale.
    const salesModel = new SalesModel(req.logger);
    const saleResult = await salesModel.getSale(saleId);

    // Return the result to the client.
    req.logger.info("Returning...");
    if (!saleResult) {
      return res.status(400).json({
        status: "Error",
        message: "Sale not found.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: saleResult,
    });
  }
}

// Code
export default SalesController;
