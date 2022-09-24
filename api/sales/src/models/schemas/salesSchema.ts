// Libs
import { Schema } from "mongoose";

// Data
const salesSchema = new Schema(
  {
    amount: Number,
    productId: String,
    totalPrice: Number,
    responsibleId: Number,
    organizationId: Number,
  },
  {
    strict: false,
  }
);

// Code
export default salesSchema;
