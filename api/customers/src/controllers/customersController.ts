// Libs
import { Logger } from "winston";
import { Request, Response } from "express";

import Security from "@security";
import CustomersModel from "@models/customersModel";
import { _Customer } from "@types";
import OrganizationsModel from "@models/organizationsModel";

// Classes
/**
 * A Customers controller.
 */
class CustomersController {
  private logger!: Logger;
  /**
   * POST /customers
   * A route to create customers.
   */
  public async postCustomers(req: Request, res: Response) {
    this.logger = req.logger;

    // Check params.
    const neededParams = ["email", "password", "organization"];
    const params = Security.filterParams(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid.");
      return res.status(400).json({
        status: "Error",
        message: "Bad request.",
      });
    }

    // Check if the customer already exists.
    const findCustomerResult = await CustomersModel.findCustomer(req.logger, {
      email: params.email,
    });

    if (findCustomerResult) {
      req.logger.info("The customer already exists.");
      return res.status(400).json({
        status: "Error",
        message: "This email already belongs to a customer.",
      });
    }

    // Check if the organization exists.
    const findOrganizationResult = await OrganizationsModel.findOrganization(
      req.logger,
      {
        id: params.organization,
      }
    );
    if (!findOrganizationResult) {
      req.logger.info("The provided organization does not exist.");
      return res.status(400).json({
        status: "Error",
        message: "This organization does not exist.",
      });
    }

    // Create the new customer.
    try {
      const customerParams = {
        email: params.email,
        password: params.password,
        fk_organizationId: params.organization,
      };
      const customer = await CustomersModel.createCustomer(
        req.logger,
        customerParams
      );
      res.status(201).json({
        status: "Success",
        data: customer,
      });
    } catch {
      res.send(500).json({
        status: "Error",
        message: "Internal server error.",
      });
    }
  }
}

// Code
export default CustomersController;
