// Libs
import { toNumber } from "@utils";

import { ClientProduct } from "@types";

// Classes
class ValidatorController {
  /**
   * A method to validate a product.
   */
  public static isValidProduct(product: ClientProduct): boolean {
    if (!product.name) return false;
    if (!toNumber(product.price)) return false;
    if (!toNumber(product.amount)) return false;
    if (!toNumber(product.organizationId)) return false;

    if (product.details && product.details.length) {
      for (let i = 0; i < product.details.length; i++) {
        const detailsEntry = product.details[i];
        if (!this.isNameValid(detailsEntry.name)) return false;
        if (!this.isNameValid(detailsEntry.value)) return false;
      }
    }

    return true;
  }

  /**
   * A method to check if the name is valid.
   */
  public static isNameValid(name: string): boolean {
    const regexName = /([^a-z 0-9./!@#$%&*])/i;
    if (!name) return false;
    if (name.length < 3) return false;
    if (regexName.exec(name)) return false;

    return true;
  }
}

// Code
export default ValidatorController;