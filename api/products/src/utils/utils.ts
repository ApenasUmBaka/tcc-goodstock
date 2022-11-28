// Functions

import { ClientProduct, PostProduct, Product } from "@types";

/**
 * A method to check if the value can be a number.
 */
export function toNumber(numb: any): number | undefined {
  try {
    return Number(numb);
  } catch {
    return;
  }
}


/**
 * A method to transform the product to client product.
 */
export function productToClientproduct(product: Product): ClientProduct {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    amount: product.amount,
    details: product.details,
    organizationId: product.organizationId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}