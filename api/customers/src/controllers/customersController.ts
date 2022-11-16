// Libs
import { Request, Response } from "express";

import Security from "@security";
import { Customer, PostCustomer } from "@types";
import CustomersModel from "@models/customersModel";
import ValidatorModel from "@models/validatorModel";
import OrganizationsModel from "@models/organizationsModel";
import { customerToClientCustomer, toNumber } from "@utils";

// Classes
/**
 * A Customers controller.
 */
class CustomersController {
  /**
   * GET /customer or GET /customer/:id
   * A route to get some customer.
   */
  public static async getCustomer(req: Request, res: Response) {
    // Check if the request has an param.
    const searchQuery: any = {};

    if (toNumber(req.params.id)) searchQuery.id = req.params.id;
    if (
      req.query.email &&
      ValidatorModel.isEmailValid(req.query.email as string)
    )
      searchQuery.email = req.query.email;

    if (!Object.keys(searchQuery).length) {
      req.logger.info("The searchQuery is empty. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Any query/param was send.",
      });
    }

    // Search if the database by the customer.
    req.logger.info("Searching by customer in the database...");
    const customersModel = new CustomersModel(req.logger);
    const customer = (await customersModel.findCustomer(
      searchQuery
    )) as Customer;

    // Return the result to the client.
    if (!customer) {
      req.logger.info("The customer was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The customer was not found.",
      });
    }

    req.logger.info(`The customer was found. Returning...`);
    return res.status(200).json({
      status: "Success",
      data: customerToClientCustomer(customer),
    });
  }

  /**
   * GET /customers/auth
   * GET /customers/:id/auth
   * A route to auth some customer.
   */
  public static async getAuth(req: Request, res: Response) {
    // Check if the request has an param.
    req.logger.info("Checking params...");
    const searchQuery: any = {};

    if (toNumber(req.params.id)) searchQuery.id = req.params.id;
    if (
      req.query.email &&
      ValidatorModel.isEmailValid(req.query.email as string)
    ) {
      searchQuery.email = req.query.email;
    }

    if (!Object.keys(searchQuery).length) {
      req.logger.info("The searchQuery is empty. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Any query/param was send.",
      });
    }

    // Find the customer.
    req.logger.info("Trying to find the customer...");
    const customersModel = new CustomersModel(req.logger);
    const customer = (await customersModel.findCustomer(
      searchQuery
    )) as Customer;
    if (!customer) {
      req.logger.info("The customer was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The customer was not found.",
      });
    }

    // Set the password and search in the database.
    req.logger.info("Trying to auth the customer in the database...");
    searchQuery.password = Security.toHash(
      (req.query.password as string) || ""
    );
    const customerWithPasswd = (await customersModel.findCustomer(
      searchQuery
    )) as Customer;

    // Return the result to the client.
    if (!customerWithPasswd) {
      req.logger.info("The customer was not authorized. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "The user was not authorized.",
      });
    }

    req.logger.info("The customer was authorized. Returning...");
    res.status(200).json({
      status: "Success",
      data: customerToClientCustomer(customerWithPasswd),
    });
  }

  /**
   * POST /customers
   * A route to create customers.
   */
  public static async postCustomer(req: Request, res: Response) {
    // Check params.
    const neededParams = (
      ["name", "email", "?password", "organizationId"]);
    const body: PostCustomer = Security.filterArgs(neededParams, req.body);
    if (
      !Object.keys(body).length ||
      !ValidatorModel.isNewCustomerArgsValid(body)
    ) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The customer id or the body is invalid.",
      });
    }

    // Check if the customer already exists.
    const customersModel = new CustomersModel(req.logger);
    const findCustomerByEmail = await customersModel.findCustomer({
      email: body.email,
    });

    if (findCustomerByEmail) {
      req.logger.info("The customer already exists. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "This email already belongs to a customer.",
      });
    }

    // Check if the organization exists.
    const organizationsModel = new OrganizationsModel(req.logger);
    const findOrganizationResult = await organizationsModel.findOrganization({
      id: body.organizationId,
    });

    if (!findOrganizationResult) {
      req.logger.info("The provided organization does not exist. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "This organization does not exist.",
      });
    }

    // Create the new customer.
    const customerArgs: {[key: string]: string | number} = {
      name: body.name,
      email: body.email,
      fk_organizationId: body.organizationId,
    };
    if (body.password) {
      customerArgs['password'] = body.password;
    }
    const customer = await customersModel.createCustomer(customerArgs as any);

    // Return the response to the client.
    if (!customer) {
      req.logger.warn(`The user was not created. Returning...`);
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error.",
      });
    }

    res.status(201).json({
      status: "Success",
      data: customerToClientCustomer(customer),
    });
  }

  /**
   * PATCH /customers/:id
   * A route to update a customer.
   */
  public static async patchCustomer(req: Request, res: Response) {
    const customerId = toNumber(req.params.id);
    if (!customerId) {
      req.logger.info("The customer's id was not provided. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The customer Id is not valid.",
      });
    }

    // Find if customer exists.
    req.logger.info(`Searching by the customer's id...`);
    const customersModel = new CustomersModel(req.logger);
    const findCustomer = await customersModel.findCustomer({ id: customerId });

    if (!findCustomer) {
      req.logger.info("The provided customer's id was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The customer Id is not valid.",
      });
    }

    // Get all the args in the body and test it.
    const patchCustomer = ValidatorModel.getCustomerPatchArgs(req.body);

    if (!patchCustomer) {
      req.logger.info("Some param in invalid. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Some argument is invalid.",
      });
    }

    // Update the customer.
    const updatedCustomer = await customersModel.updateCustomer(
      Number(customerId),
      patchCustomer
    );

    // Return the result to the client.
    if (!updatedCustomer) {
      req.logger.warn(`The customer couldn't be updated. Returning...`);
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: customerToClientCustomer(updatedCustomer),
    });
  }
}

// Code
export default CustomersController;
