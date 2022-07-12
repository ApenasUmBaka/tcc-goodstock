// Libs
import { setTimeout } from "timers/promises";

import Database from "../models/database";
import LoggerFactory from "../logger/logger";

// Data
const logger = LoggerFactory.createLogger("SERVER");

// Class
abstract class Migrations {
  public static async up() {
    await setTimeout(10 * 1000);
    logger.info("Getting up Migrations...");

    try {
      await Database.seq.sync();
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
      await Database.seq.drop();
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
