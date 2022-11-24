// Libs
import { toNumber } from "@utils";

import { Product } from "@types";

// Classes
class ValidatorController {
  /**
   * A method to validate a product.
   */
  public static isValidProduct(product: Product): boolean {
    if (!product.name) return false;
    if (!toNumber(product.price)) return false;
    if (!toNumber(product.amount)) return false;
    if (!toNumber(product.organizationId)) return false;

    return true;
  }
}

// Code
export default ValidatorController;