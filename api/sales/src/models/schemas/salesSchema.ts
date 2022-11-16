// Libs
import { Schema } from "mongoose";

// Data
const salesSchema = new Schema(
  {
    date: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    responsibleId: { type: Number, required: true },
    organizationId: { type: Number, required: true },
    soldProducts: {
      type: Map,
      required: true,
      of: {
        type: Map,
        values: Number,
      },
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

// Code
export default salesSchema;
