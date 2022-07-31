// Libs
import mongoose from "mongoose";

// Classes
/**
 * A class to represents de database connection.
 */
abstract class Database {
  private static user = process.env.MONGO_INITDB_ROOT_USERNAME;
  private static pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
  private static dbName = "admin";

  public static mongoose = mongoose.createConnection(
    `mongodb://${this.user}:${this.pass}@goodstock_api_products_db:27017/${this.dbName}`
  );
}

// Code
export default Database;
