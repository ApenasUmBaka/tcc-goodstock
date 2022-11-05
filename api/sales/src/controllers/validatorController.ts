// Libs
import { Logger } from "winston";

import { Sale } from "@types";
import { toNumber } from "@utils";

// Classes
class ValidatorController {
  /**
   * A method to check if the email already has an account linked.
   */
  public static isSaleValid(sale: Sale): boolean {
    if (!toNumber(sale.totalPrice)) return false;
    if (!toNumber(sale.responsibleId)) return false;
    if (!toNumber(sale.organizationId)) return false;

    const productsKeys = Object.keys(sale.soldProducts);
    if (productsKeys.length == 0) return false;

    for (const index in productsKeys) {
      const productKey = productsKeys[index];
      if (!toNumber(sale.soldProducts[productKey].amount)) return false;
      if (!toNumber(sale.soldProducts[productKey].unitPrice)) return false;
    }

    return true;
  }
}

// Code
export default ValidatorController;
