// Libs
import Sequelize, { ModelAttributes } from "sequelize";

// Data
const organizationsSchema: ModelAttributes = {
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
};

// Code
export default organizationsSchema;
