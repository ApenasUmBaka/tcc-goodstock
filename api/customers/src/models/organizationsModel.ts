// Libs
import Sequelize from "sequelize";
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

  public static async findOrganization(
    logger: Logger,
    params: any
  ): Promise<_Organization | undefined> {
    logger.info("Locating a organization...");

    const organization = await OrganizationsModel.model.findOne({
      where: params,
    });

    if (!organization) {
      logger.info("A organization with the provided query was not found.");
      return;
    }

    logger.info("A organization with the provided query was found.");
    return organization.toJSON();
  }
}

// Code
export default OrganizationsModel;
