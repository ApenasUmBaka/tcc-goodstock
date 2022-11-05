// Libs
import { Logger } from "winston";
import axios, { AxiosError, AxiosResponse } from "axios";

import { APIResponse } from "@types";

// Classes
abstract class APIModel {
  abstract url: string;
  abstract logger: Logger;

  protected async callAPI(
    method: string,
    route: string,
    data?: any
  ): Promise<AxiosResponse | undefined> {
    const requestUrl = `${this.url}${route}`;
    this.logger.info(`Calling API on: ${requestUrl}`);

    let response: AxiosResponse;
    try {
      response = await axios.request({
        method: method,
        url: requestUrl,
        data: data,
        headers: {
          authorization: `Bearer ${process.env.API_AUTH}`,
        },
      });
    } catch (err) {
      const error: AxiosError = err as any;
      if (!error.response) {
        this.logger.error(`The request was not completed. Error: ${err}`);
        return;
      }

      response = error.response;
    }

    this.logger.info("The request was completed.");
    return response;
  }
}

// Code
export default APIModel;
