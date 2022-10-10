// Libs
import { Logger } from "winston";

import { User } from "@types";
import Security from "@security";
import APIModel from "@models/apiModel";

// Classes
class CustomersModel extends APIModel {
  public logger: Logger;
  public url: string = "http://goodstock_api_main:3000/customers";

  constructor(logger: Logger) {
    super();
    this.logger = logger;
  }

  /**
   * A method to get the ID from some customer using the email.
   */
  public async getIdByEmail(email: string): Promise<number | undefined> {
    const apiResult = await this.callAPI('GET', '/customer', {email: email});
    if (!apiResult) return;
    return apiResult.data.id;
  }

  /**
   * A method to test the auth using the email and password from some customer.
   */
  public async authCustomer(
    email: string,
    password: string
  ): Promise<User | undefined> {
    this.logger.info(`Checking the auth from: ${email}`);
    // Search on the API by the user's email.
    const data = {
      email: email,
    };

    const response = await this.callAPI("GET", "/customers", data);
    if (!response) return;
    if (!response.data) {
      this.logger.info("The provided email was not found.");
      return;
    }

    this.logger.info("The provided email was found in the API.");
    const userData: User = {
      id: response.data.id,
      email: response.data.email,
      organizationId: response.data.organizationId,
    };

    this.logger.info("Trying to auth the account...");
    const authResponse = await this.callAPI(
      "GET",
      `/${userData.id}/auth?password=${Security.toHash(password)}`
    );
    if (!authResponse) return;
    if (authResponse.status == 400) {
      this.logger.info("Bad login.");
      return;
    }

    return userData;
  }
}

// Code
export default CustomersModel;
