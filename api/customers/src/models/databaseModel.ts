// Libs
import { Sequelize } from "sequelize";

// Classes
/**
 * A class to represents de database connection.
 */
abstract class Database {
  private static user = process.env.POSTGRES_USER;
  private static pass = process.env.POSTGRES_PASSWORD;

  public static seq = new Sequelize({
    host: "goodstock_api_customers_db",
    port: 5432,
    username: this.user,
    password: this.pass,
    dialect: "postgres",
    logging: false,
  });
}

// Code
export default Database;
