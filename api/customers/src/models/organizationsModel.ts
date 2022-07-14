// Libs
import Sequelize from "sequelize";

import Database from "./databaseModel";
import organizationsSchema from "./schemas/organizationsSchema";

// Data
abstract class OrganizationsModel {
    public static model = Database.seq.define("organizations", organizationsSchema);
}

// Code
export default OrganizationsModel;
