// Libs
import { Logger } from "winston";
import { Model } from "sequelize";

import Database from "./databaseModel";
import { Organization, PatchOrganization } from "../types/types";
import organizationsSchema from "./schemas/organizationsSchema";

// Data
class OrganizationsModel {
  private logger: Logger;
  public model = Database.seq.define("organizations", organizationsSchema);

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to create a new organization.
   */
  public async createOrganization(
    params: any
  ): Promise<Organization | undefined> {
    this.logger.info("Creating the new organization...");

    // Create the new organization.
    try {
      const newOrganization = (await this.model.create(params)).toJSON();
      this.logger.info(
        `The new organization #${newOrganization.id} was created.`
      );
      return newOrganization;
    } catch (err) {
      this.logger.error(`The organization couldn't be created. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to get a organization.
   */
  public async findOrganization(
    params: any,
    returnModel: boolean = false
  ): Promise<Organization | Model | undefined> {
    this.logger.info("Locating an organization...");

    // Try to find the organization
    let organization: Model | null;
    try {
      organization = await this.model.findOne({
        where: params,
      });
    } catch (err) {
      this.logger.error(`Couldn\'t search by the organization. Error: ${err}`);
      return;
    }

    // Return the result.
    if (!organization) {
      this.logger.info("A organization with the provided query was not found.");
      return;
    }

    this.logger.info("A organization with the provided query was found.");
    if (returnModel) organization;
    return organization.toJSON();
  }

  /**
   * A method to update an organization.
   */
  public async updateOrganization(
    id: number,
    params: PatchOrganization
  ): Promise<Organization | undefined> {
    this.logger.info(`Updating organization #${id}`);

    // Update the organization.
    try {
      const organization = (await this.findOrganization({ id: id })) as any;
      if (!organization) throw "No organization found.";

      const paramsKeys = Object.keys(params);
      paramsKeys.forEach((value, index) => {
        organization[paramsKeys[index]] = value;
      });

      await organization.save();
      return organization;
    } catch (err) {
      this.logger.error(`The organization couldn't be updated. Error: ${err}`);
      return;
    }
  }
}

// Code
export default OrganizationsModel;
