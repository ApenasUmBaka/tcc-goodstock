// Libs
import { Schema } from "mongoose";

// Data
const productsSchema = new Schema(
  {
    name: String,
    organizationId: Number,
    price: Number,
    amount: Number,
    details: [
      new Schema({
        name: String,
        value: String
      }, {
        _id: false
      })
    ]
  },
  {
    strict: false,
    timestamps: true
  }
);

// Code
export default productsSchema;
