// Libs
import { Logger } from "winston";

import Database from "./databaseModel";
import organizationsSchema from "./schemas/organizationsSchema";
import { _Organization } from "@types";

// Data
abstract class OrganizationsModel {
  public static model = Database.seq.define(
    "organizations",
    organizationsSchema
  );

  /**
   * A method to create a new organization.
   */
  public static async createOrganization(
    logger: Logger,
    params: any
  ): Promise<_Organization> {
    logger.info("Creating the new organization...");

    let newOrganization: _Organization;
    try {
      newOrganization = (await this.model.create(params)).toJSON();
    } catch (err) {
      logger.error(`The organization couldn't be created. Error: ${err}`);
      throw err;
    }

    logger.info(`The new organization #${newOrganization.id} was created.`);
    return newOrganization;
  }

  /**
   * A method to get a organization.
   */
  public static async findOrganization(
    logger: Logger,
    params: any
  ): Promise<_Organization | undefined> {
    logger.info("Locating a organization...");

    const organization = await this.model.findOne({
      where: params,
    });

    if (!organization) {
      logger.info("A organization with the provided query was not found.");
      return;
    }

    logger.info("A organization with the provided query was found.");
    return organization.toJSON();
  }

  public static async updateOrganization(
    logger: Logger,
    id: number,
    params: any
  ): Promise<_Organization> {
    logger.info(`Updating organization #${id}`);

    await this.model.update(params, {
      where: {
        id: id,
      },
    });
    return this.findOrganization(logger, { id: id }) as any;
  }
}

// Code
export default OrganizationsModel;
