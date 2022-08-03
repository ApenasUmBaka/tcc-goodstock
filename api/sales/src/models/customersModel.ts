// Libs
import { Logger } from "winston";
import axios, { AxiosResponse, AxiosError } from "axios";

import { Customer } from "@types";

// Classes
/**
 * A class to manipulate all connections to the customers API, using just the customers routes.
 */
class CustomersModel {
  private logger: Logger;
  private apiKey = process.env.CUSTOMERS_API_AUTH;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to get some customer using the ID.
   */
  public async getCustomer(
    customerId: number
  ): Promise<Customer | undefined> {
    // Get the customer.
    const res = await this.request("GET", customerId);

    if (!res) return;
    return res.data;
  }

  /**
   * A method to communicate with the customer API.
   */
  private async request(method: string, customerId: number, data?: any) {
    this.logger.info("Doing a request to the customers api...");

    // Do the request to the API.
    let response: AxiosResponse;
    const route = `http://goodstock_api_customers:3001/customers/${customerId}`;

    try {
      response = await axios.request({
        method: method,
        url: route,
        data: data,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    } catch (err) {
      const error: AxiosError = err as any;

      // Check if the request was completed.
      if (!error.response) {
        this.logger.error(
          `The connection to the customers API was not completed. Error: ${err}`
        );
        return;
      }
      response = error.response;
    }

    // Check if the request was successfully.
    if (response.data.status == "Error") {
      this.logger.info(
        `The request has returned the status "Error". Message: ${response.data.message}`
      );
      return;
    }

    this.logger.info("The request was successfully completed.");
    return response.data;
  }
}

export default CustomersModel;
