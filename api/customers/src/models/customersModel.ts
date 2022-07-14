// Libs
import Sequelize from "sequelize";

import Database from "./databaseModel";
import customerSchema from "./schemas/customersSchema";

// Data
abstract class CustomersModel {
  public static model = Database.seq.define("customers", customerSchema);
}

// Code
export default CustomersModel;
