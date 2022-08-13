// Libs
import Sequelize from "sequelize";
import { ModelAttributes } from "sequelize/types";

// Data
const salesSchema: ModelAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organizationId: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  responsible: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

// Code
export default salesSchema;
