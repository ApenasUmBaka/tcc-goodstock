// Libs
import Sequelize from "sequelize";
import { ModelAttributes } from "sequelize/types";

// Data
const customerSchema: ModelAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fk_organizationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "organizations",
      key: "id",
    },
  },
};

// Code
export default customerSchema;
