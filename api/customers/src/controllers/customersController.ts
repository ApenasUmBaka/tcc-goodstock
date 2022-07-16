// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import CustomersModel from "@models/customersModel";
import OrganizationsModel from "@models/organizationsModel";
import { _Customer } from "@types";

// Classes
/**
 * A Customers controller.
 */
class CustomersController {
  /**
   * POST /customers
   * A route to create customers.
   */
  public async postCustomer(req: Request, res: Response) {
    // Check params.
    const neededParams = ["email", "password", "organization"];
    const params = Security.filterParams(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.sendStatus(400);
    }

    // Check if the customer already exists.
    const findCustomerResult = await CustomersModel.findCustomer(req.logger, {
      email: params.email,
    });

    if (findCustomerResult) {
      req.logger.info("The customer already exists. Returning...");
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
      req.logger.info("The provided organization does not exist. Returning...");
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
      req.logger.info("Returning result...");
      res.status(201).json({
        status: "Success",
        data: customer,
      });
    } catch {
      req.logger.warn("Returning internal server error...");
      res.sendStatus(500);
    }
  }

  /**
   * GET /customer or GET /customer/:id
   * A route to get some customer.
   */
  public async getCustomer(req: Request, res: Response) {
    const query = this.getCustomerQuery(req);
    if (!query) {
      req.logger.info("The query is empty. Returning...");
      return res.sendStatus(400);
    }

    const findCustomerResult = await CustomersModel.findCustomer(
      req.logger,
      query
    );

    if (findCustomerResult) {
      req.logger.info(
        `The customer ${findCustomerResult.id} was found. Returning...`
      );
      return res.status(200).json({
        status: "Success",
        data: {
          id: findCustomerResult.id,
          email: findCustomerResult.email,
          organization: findCustomerResult.fk_organizationId,
        },
      });
    }

    req.logger.info("The customer was not found. Returning...");
    return res.status(400).json({
      status: "Error",
      message: "The customer was not found",
    });
  }

  /**
   * PATCH /customers/:id
   * A route to update a customer.
   */
  public async patchCustomer(req: Request, res: Response) {
    const customerId = req.params.id;
    if (!customerId || !toNumber(customerId)) {
      req.logger.info("The customer's id was not provided. Returning...");
      return res.sendStatus(400);
    }

    // Find if customer exists.
    const findCustomerResult = await CustomersModel.findCustomer(req.logger, {
      id: customerId,
    });
    if (!findCustomerResult) {
      req.logger.info("The provided customer's id was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The provided id was not found.",
      });
    }

    // Update the customer.
    const customersParams = {
      email: req.body.email ? req.body.email : findCustomerResult.email,
      password: req.body.password
        ? req.body.password
        : findCustomerResult.password,
    };

    const updatedCustomer = await CustomersModel.updateCustomer(
      req.logger,
      Number(customerId),
      customersParams
    );

    return res.status(200).json({
      status: "Success",
      data: {
        id: updatedCustomer.id,
        email: updatedCustomer.email,
        organization: updatedCustomer.fk_organizationId,
      },
    });
  }

  /**
   * Used by the GET /customer or GET/customer/:id
   */
  private getCustomerQuery(req: Request) {
    if (req.params.id) {
      if (!toNumber(req.params.id)) return;
      return {
        id: req.params.id,
      };
    }

    const neededParams = ["email"];
    const params = Security.filterParams(neededParams, req.body);
    if (Object.keys(params).length) {
      return {
        email: params.email,
      };
    }

    return;
  }
}

// Code
export default CustomersController;
