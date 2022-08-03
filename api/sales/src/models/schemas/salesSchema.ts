// Libs
import { Schema } from "mongoose";

// Data
const salesSchema = new Schema({
  productId: Number,
  organizationId: Number,
  responsibleEmail: String,
  price: Number,
  status: String,
});

// Code
export default salesSchema;
