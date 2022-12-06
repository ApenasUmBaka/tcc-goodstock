// Libs
import { Logger } from "winston";

import APIModel from "@models/apiModel";
import { APIResponse, ClientUser, RequestCustomer, User } from "@types";

// Classes
class CustomersModel extends APIModel {
  public logger: Logger;
  public url: string = "http://goodstock_api_main:3000/customers";

  constructor(logger: Logger) {
    super();
    this.logger = logger;
  }

  /**
   * A method to test the auth using the email and password from some customer.
   */
  public async authCustomer(
    email: string,
    password: string
  ): Promise<ClientUser | undefined> {
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
    this.logger.info("Trying to auth the account...");
    const authResponse = await this.callAPI(
      "GET",
      `/customers/auth?email=${email}&password=${password}`
    );
    if (!authResponse) return;

    const apiResponse: APIResponse = authResponse.data;
    if (apiResponse.status == "Error") {
      this.logger.info("Bad login.");
      return;
    }

    return apiResponse.data;
  }

  /**
   * A method to create a new customer.
   */
  public async createCustomer(
    name: string,
    email: string,
    password: string,
    organizationId: number
  ): Promise<ClientUser | undefined> {
    this.logger.info("Creating a new customer...");

    const userData: RequestCustomer = {
      name: name,
      email: email,
      password: password,
      organizationId: organizationId,
    };

    const apiCall = await this.callAPI("POST", "/customers", userData);
    if (!apiCall) return;
    const apiResponse: APIResponse = apiCall.data;

    if (apiResponse.status == "Error") {
      this.logger.warn(`The customer was not created.`);
      return;
    }

    return apiResponse.data;
  }

  /**
   * A method to get the ID from some customer using the email.
   */
   public async getCustomerByEmail(email: string): Promise<User | undefined> {
    const apiResult = await this.callAPI("GET", `/customers/?email=${email}`);
    if (!apiResult) return;
    return apiResult.data;
  }

  /**
   * A method to search by customers using a query.
  */
  public async getCustomerByQuery(query: any): Promise<ClientUser[] | undefined> {
    // Add the query to the url.
    const url = `/customers/query?${new URLSearchParams(query).toString()}`;

    const apiResult = await this.callAPI("GET", url);
    if (!apiResult || apiResult.data.status == 'Error') return;
    return apiResult.data.data;
  }
}

// Code
export default CustomersModel;
