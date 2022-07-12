// Libs
import Sequelize from "sequelize";

import Database from "./database";

// Data
const Organizations = Database.seq.define("organizations", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organizationName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Code
export default Organizations;
