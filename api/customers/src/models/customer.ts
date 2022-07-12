// Libs
import Sequelize from "sequelize";

import Database from "./database";

// Data
const Customers = Database.seq.define("customers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fk_organizationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "organizations",
      key: "id",
    },
  },
});

// Code
export default Customers;
