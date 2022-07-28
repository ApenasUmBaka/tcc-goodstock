// Libs
import { Schema } from "mongoose";

// Data
const productsSchema = new Schema(
  {
    name: String,
    fk_organizationId: Number,
    price: Number,
    amount: Number,
  },
  {
    strict: false,
  }
);

// Code
export default productsSchema;
