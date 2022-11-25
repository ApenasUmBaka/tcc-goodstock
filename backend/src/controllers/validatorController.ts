// Libs
import { Logger } from "winston";

import CustomersModel from "@models/customersModel";

// Classes
class ValidatorController {
  /**
   * A method to check if the email already has an account linked.
   */
  public static async isEmailTaken(
    logger: Logger,
    email: string
  ): Promise<boolean> {
    logger.info("Checking if the email already has been taken...");
    const customersModel = new CustomersModel(logger);
    const user = await customersModel.getCustomerByEmail(email);
    if (user?.name) {
      logger.info("The email has already been taken...");
      return true;
    }

    return false;
  }
}

// Code
export default ValidatorController;
