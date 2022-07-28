// Libs
import axios from "axios";
import { Logger } from "winston";

// Classes
class OrganizationsModel {
  private static apiKey = process.env.CUSTOMERS_API_AUTH;
  public static async getOrganization(logger: Logger) {
    logger.info('Doing a request to the organizations api...');
    try {
      const res = await axios.get('http://goodstock_api_customers:3001', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!res.data.status) {
        logger.info(`The request was returned with the status error. Error: ${res.data.message}`);
      }
      return res.data;
    } catch (err) {
      logger.error('Error on trying to stabilish a connection to the customers api.');
      return {};
    }
  }
}
