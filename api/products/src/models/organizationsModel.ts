// Libs
import axios, { AxiosError } from "axios";
import { Logger } from "winston";

// Classes
class OrganizationsModel {
  private static apiKey = process.env.CUSTOMERS_API_AUTH;
  public static async getOrganization(logger: Logger, org: number) {
    const route = `organizations/${org}`;

    const data = await this.request(logger, "GET", route);
    return data;
  }

  private static async request(logger: Logger, method: string, route: string) {
    logger.info("Doing a request to the organizations api...");
    try {
      const res = await axios.request({
        method: method,
        url: `http://goodstock_api_customers:3001/${route}`,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (res.data.status == "Error") {
        logger.info(
          `The request was returned with the status error. Error: ${res.data.message}`
        );
        return;
      }
      return res.data;
    } catch (err) {
      const error: AxiosError = err as any;
      if (!error.response) {
        logger.error(
          `Error on trying to stabilish a connection to the customers api. Error: ${err}`
        );
        return;
      }

      const data = error.response.data as any;
      if (data.message == "The organization was not found") {
        return;
      }
    }
  }
}

export default OrganizationsModel;
