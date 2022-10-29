// Libs
import { Schema } from "mongoose";

// Data
const salesSchema = new Schema(
  {
    totalPrice: Number,
    responsibleId: Number,
    organizationId: Number,
    soldProducts: {
      type: Map,
      of: {
        type: Map,
        values: Number
      }
    }
  },
  {
    strict: false,
  }
);

// Code
export default salesSchema;
