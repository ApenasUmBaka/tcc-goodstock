// Libs
import { Logger } from "winston";

import Security from "@security";
import { toNumber } from "@utils";
import { RequestRegisterUserBody } from "@types";
import CustomersModel from "@models/customersModel";

// Classes
class ValidatorController {
  /**
   * A method to check if the email already has an account linked.
   */
  public static async isEmailTaken(logger: Logger, email: string): Promise<boolean> {
    logger.info('Checking if the email already has been taken...');
    const customersModel = new CustomersModel(logger);
    const userId = await customersModel.getIdByEmail(email);
    if (userId) {
      logger.info('The email has already been taken...');
      return true;
    }

    return false;
  }

  /**
   * A method to check if the user has valid credentials.
   */
  public static isRegisterUserValid(logger: Logger, body: RequestRegisterUserBody): boolean {
    // Check email
    logger.info('Checking email...');
    if (!Security.isEmailValid(body.registerEmail.toString())) return false;

    logger.info('Checking password...');
    // Check passwd
    if (!Security.isPasswdValid(body.registerPasswd.toString())) return false;

    // Check organizationID
    logger.info('Checking organization ID...');
    const orgId = toNumber(body.registerOrgId);
    if (!orgId || orgId < 0) return false;

    // Check orgPasswd
    logger.info('Checking organization password...');
    if (!Security.isPasswdValid(body.registerOrgPasswd.toString())) return false;

    logger.info('All register user\'s credentials type were checked.');
    return true;
  }
}

// Code
export default ValidatorController;