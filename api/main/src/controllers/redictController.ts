// Libs
import Axios, {AxiosError} from "axios";
import { Request, Response } from "express";

// Data
const services: any = {
    'customers': process.env.CUSTOMERS_API_URL,
    'organizations': process.env.PRODUCTS_API_URL,
};


// Classes
class RedictController {
  /**
   * A method to get the service from some url.
   * @returns The service from the customer.
   */
  private static getService(url: string) {
    // Get the target api.
    const urlWithoutParams = url.split("?")[0];
    const service = urlWithoutParams.split('/')[1];
    const servicesKeys = Object.keys(services);
    for (let i = 0; i < servicesKeys.length; i++) {
      const serviceKey = servicesKeys[i];
      console.log(`"${serviceKey}" - "${service}"`);
      if (serviceKey == service) {
        return serviceKey;
      }
    }
    return;
  }

  public static async allRedirect(req: Request, res: Response) {
    const service = RedictController.getService(req.url);

    if (!service) {
      return res.sendStatus(400);
    }

    // Do the request and return it.
    const url = services[service];
    try {
      const request = await Axios.request({
        url: url,
        data: req.body,
        method: req.method,
        headers: req.headers as any,
      });
      return res.status(request.status).json(request.data);
    } catch (err) {
      const error = err as AxiosError;

      if (!("response" in error)) {
        return res.sendStatus(500);
      }

      res.status(error.response?.status as any).json(error.response?.data);
    }
  }
}

// Code
export default RedictController;