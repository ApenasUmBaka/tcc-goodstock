// Libs
import mongoose from "mongoose";

// Classes
/**
 * A class to represents de database connection.
 */
abstract class Database {
  private static user = process.env.POSTGRES_USER;
  private static pass = process.env.POSTGRES_PASSWORD;
  private static dbName = process.env.MONGO_INITDB_DATABASE;

  public static mongoose = mongoose.createConnection(
    `mongodb://${this.user}:${this.pass}@goodstock_api_products_db:27017/${this.dbName}`
  );
}

// Code
export default Database;
