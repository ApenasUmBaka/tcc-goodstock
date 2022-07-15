// Libs
import { Logger } from "winston";
import Sequelize from "sequelize";

import Database from "./databaseModel";
import customerSchema from "./schemas/customersSchema";
import { _Customer } from "@types";

// Data
abstract class CustomersModel {
  public static model = Database.seq.define("customers", customerSchema);

  /**
   * A method to create a new Customer.
   */
  public static async createCustomer(
    logger: Logger,
    params: any
  ): Promise<_Customer> {
    logger.info("Creating the new customer...");
    let newCustomer: _Customer;
    try {
      newCustomer = (await this.model.create(params)).toJSON();
    } catch (err) {
      logger.error(`The customer couldn't be created. Error: ${err}`);
      throw err;
    }

    logger.info(`The new customer #${newCustomer.id} was created.`);
    return newCustomer;
  }

  /**
   * A method to get a customer.
   */
  public static async findCustomer(
    logger: Logger,
    params: any
  ): Promise<_Customer | undefined> {
    logger.info("Locating a customer...");

    const customer = await this.model.findOne({
      where: params,
    });

    if (!customer) {
      logger.info("A customer with the provided query was not found.");
      return;
    }

    logger.info("A customer with the provided query was found.");
    return customer.toJSON();
  }

  public static async updateCustomer(
    logger: Logger,
    id: number,
    params: any
  ): Promise<_Customer> {
    logger.info(`Updating customer #${id}`);

    await this.model.update(params, {
      where: {
        id: id,
      },
    });
    return this.findCustomer(logger, { id: id }) as any;
  }
}

// Code
export default CustomersModel;
