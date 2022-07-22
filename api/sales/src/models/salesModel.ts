// Libs
import { Logger } from "winston";

import Database from "@models/databaseModel";
import salesSchema from "@schemas/salesSchema";

// Data
abstract class SalesModel {
  public static model = Database.mongoose.model("sales", salesSchema);
}

// Code
export default SalesModel;
