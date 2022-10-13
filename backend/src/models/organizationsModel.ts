// Libs
import { Logger } from "winston";

import { APIResponse, User } from "@types";
import Security from "@security";
import APIModel from "@models/apiModel";

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
    this.logger.info(`Checking the auth from organization[${orgId}]`);
    const data = {
        organizationId: orgId,
        organizationPasswd: orgPasswd
    };

    this.logger.info("Trying to auth with the organization...");
    const authResponse = await this.callAPI(
      "GET",
      '/organizations/auth',
      data
    );

    if (!authResponse) {
      return false;
    }

    const resData: APIResponse = authResponse?.data;

    if (authResponse.status != 200 || resData.status == 'Error') {
        this.logger.info('The auth was not authorized.');
        return false;
    }

    return true;
  }
}

// Code
export default OrganizationsModel;
