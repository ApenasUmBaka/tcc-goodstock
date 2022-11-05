// Libs
import Sequelize, { ModelAttributes } from "sequelize";

// Data
const organizationsSchema: ModelAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  masterPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

// Code
export default organizationsSchema;
