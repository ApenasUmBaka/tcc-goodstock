// Libs
import Axios, {AxiosError} from "axios";
import { Request, Response } from "express";

// Data
const services: any = {
  'data': process.env.API_DATA_URL,
  'sales': process.env.API_SALES_URL,
  'products': process.env.API_PRODUCTS_URL,
  'customers': process.env.API_CUSTOMERS_URL,
  'organizations': process.env.API_CUSTOMERS_URL,
};


// Classes
class RedictController {

  public static async allRedirect(req: Request, res: Response) {
    const service = req.url.split('/').slice(1,2)[0]; // [ '', '/customers', '/something']

    if (!service) {
      return res.sendStatus(400);
    }

    // Do the request and return it.
    const selectedRoute = req.url.split('/').slice(2).join('/');
    const url = `http://${services[service]}/${selectedRoute}`;
    req.logger.info(`Doing request to: ${url}`);
    try {
      const request = await Axios.request({
        url: url,
        data: req.body,
        method: req.method,
      });
      req.logger.info('The request has been completed.');

      return res.status(request.status).json(request.data);
    } catch (err) {
      const error = err as AxiosError;

      if (!("response" in error)) {
        req.logger.warn(`The request has returned an error. Error: ${err}`);
        return res.sendStatus(500);
      }

      req.logger.info('The request has been completed.');
      res.status(error.response?.status as any).json(error.response?.data);
    }
  }
}

// Code
export default RedictController;