// Libs
import { Logger } from "winston";
import { Model } from "sequelize";

import Database from "./databaseModel";
import Security from "../controllers/security";
import customerSchema from "./schemas/customersSchema";
import { Customer, FindCustomer, PatchCustomer } from "../types/types";

// Data
class CustomersModel {
  private logger: Logger;
  public model = Database.seq.define("customers", customerSchema);

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to create a new Customer.
   */
  public async createCustomer(params: Customer): Promise<Customer | undefined> {
    this.logger.info("Creating the new customer...");

    // Create the new customer.
    if (params.password) params.password = Security.toHash(params.password);

    try {
      const newCustomer: Customer = (
        await this.model.create(params as any)
      ).toJSON();
      this.logger.info(`The new customer #${newCustomer.id} was created.`);
      return newCustomer;
    } catch (err) {
      this.logger.error(`The customer couldn't be created. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to get a customer.
   */
  public async findCustomer(
    params: FindCustomer,
    returnModel?: boolean
  ): Promise<Customer | Model | undefined> {
    this.logger.info("Locating a customer...");

    // Try to find the customer.
    try {
      const customer = await this.model.findOne({
        where: params as any,
      });

      // Return the result to the caller.
      if (!customer) {
        this.logger.info("A customer with the provided query was not found.");
        return;
      }

      this.logger.info("A customer with the provided query was found.");
      if (returnModel) return customer;
      return customer.toJSON();
    } catch (err) {
      this.logger.error(`The customer couldn't be found. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to get a customers.
   */
   public async findCustomers(
    params: FindCustomer
  ): Promise<Model[] | undefined> {
    this.logger.info("Locating the customers...");

    // Try to find the customers.
    try {
      const customer = await this.model.findAll({
        where: params as any,
      });

      // Return the result to the caller.
      if (!customer) {
        this.logger.info("Customers with the provided query was not found.");
        return;
      }

      this.logger.info("Customers with the provided query was found.");
      return customer;
    } catch (err) {
      this.logger.error(`The customers couldn't be found. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to update a customer
   */
  public async updateCustomer(
    id: number,
    params: PatchCustomer
  ): Promise<Customer | undefined> {
    this.logger.info(`Updating customer #${id}`);

    // Try to update the customer.
    try {
      const customer = (await this.findCustomer({ id: id }, true)) as any;
      if (!customer) throw "No customer found.";

      const paramsKeys = Object.keys(params);
      paramsKeys.forEach((value, index) => {
        customer[paramsKeys[index]] = value;
      });

      customer.name = params.name!;
      customer.email = params.email!;
      customer.password = params.password!;
      await customer.save();

      return customer;
    } catch (err) {
      this.logger.error(`The customer couldn't be updated. Error: ${err}`);
      return;
    }
  }
}

// Code
export default CustomersModel;
