// Libs
import { Logger } from "winston";

import APIModel from "@models/apiModel";
import { APIResponse, ClientOrganization } from "@types";

// Classes
class OrganizationsModel extends APIModel {
  public logger: Logger;
  public url: string = "http://goodstock_api_main:3000/organizations";

  constructor(logger: Logger) {
    super();
    this.logger = logger;
  }

  /**
   * A method to test the auth using the email and password from some organization.
   */
  public async authOrganization(
    orgId: number,
    orgPasswd: string
  ): Promise<boolean> {
    this.logger.info("Trying to auth with the organization...");
    const authResponse = await this.callAPI(
      "GET",
      `/organizations/auth/?id=${orgId}&masterPassword=${orgPasswd}`
    );

    if (!authResponse) {
      return false;
    }

    const resData: APIResponse = authResponse?.data;

    if (resData.status == "Error") {
      this.logger.info("The auth was not authorized.");
      return false;
    }

    return true;
  }

  /**
   * A method to create an organization.
   */
  public async createOrganization(
    orgName: string,
    orgPasswd: string
  ): Promise<ClientOrganization | undefined> {
    const data = {
      name: orgName,
      masterPassword: orgPasswd,
    };

    this.logger.info("Trying to create the new organization...");
    const authResponse = await this.callAPI("POST", "/organizations/", data);

    if (!authResponse) {
      this.logger.info(`The organization couldn't be created.`);
      return;
    }

    const resData: APIResponse = authResponse?.data;
    if (resData.status == "Error") {
      this.logger.info("The request has returned some error.");
      return;
    }

    return resData.data;
  }

  /**
   * A method to find an organization.
   */
  public async findOrganization(
    query: any
  ): Promise<ClientOrganization | undefined> {
    this.logger.info("Trying to find an organization...");
    let authResponse: any;
    if (query.id) {
      authResponse = await this.callAPI("GET", `/organizations/${query.id}`);
    } else {
      const data = {
        where: query,
      };
      authResponse = await this.callAPI("GET", `/organizations/`, data);
    }

    if (!authResponse) {
      this.logger.info(`The organization couldn't be found.`);
      return;
    }

    const resData: APIResponse = authResponse?.data;
    if (resData.status == "Error") {
      this.logger.info("The request has returned some error.");
      return;
    }

    return resData.data;
  }
}

// Code
export default OrganizationsModel;
