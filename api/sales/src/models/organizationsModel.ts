// Libs
import { Logger } from "winston";
import axios, { AxiosResponse, AxiosError } from "axios";

import { BasicResponse, Organization } from "@types";

// Classes
/**
 * A class to manipulate all connections to the customers API, using just the organizations routes.
 */
class OrganizationsModel {
  private logger: Logger;
  private apiKey = process.env.CUSTOMERS_API_AUTH;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to get some organization using the ID.
   */
  public async getOrganization(
    organizationId: number
  ): Promise<Organization | undefined> {
    // Get the organization.
    const res = await this.request("GET", organizationId);

    if (!res) return;
    return res.data;
  }

  /**
   * A method to communicate with the organizations API.
   */
  private async request(
    method: string,
    organizationId: number,
    data?: any
  ): Promise<BasicResponse | undefined> {
    this.logger.info("Doing a request to the organizations api...");

    // Do the request to the API.
    let response: AxiosResponse;
    const route = `http://goodstock_api_customers:3001/organizations/${organizationId}`;

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
          `The connection to the Organizations API was not completed. Error: ${err}`
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

export default OrganizationsModel;
