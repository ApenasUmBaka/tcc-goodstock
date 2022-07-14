// Libs
import { setTimeout } from "timers/promises";

import LoggerFactory from "../logger/logger";
import DatabaseModel from "../models/databaseModel";
import CustomersModel from "../models/customersModel";
import OrganizationsModel from "../models/organizationsModel";

// Data
const logger = LoggerFactory.createLogger("SERVER");

// Class
abstract class Migrations {
  public static async up() {
    await setTimeout(10 * 1000);
    logger.info("Getting up Migrations...");

    try {
      await OrganizationsModel.model.sync();
      await CustomersModel.model.sync();

      await DatabaseModel.seq.sync();
      logger.info("The migrations have been getting up.");
    } catch (err) {
      logger.error(
        `An error was raised while getting up migrations. Error: ${err}`
      );
    }
  }

  public static async down() {
    await setTimeout(10 * 1000);
    logger.info("Getting down migrations...");

    try {
      await DatabaseModel.seq.drop();
      logger.info("The migrations have been dropped.");
    } catch (err) {
      logger.error(
        `An error was raised while getting down migrations. Error: ${err}`
      );
    }
  }
}

// Code
const args = process.argv.slice(2);
switch (args[0]) {
  case "up":
    Migrations.up();
    break;
  case "down":
    Migrations.down();
    break;
  default:
    logger.error("The argument was not found!");
}
