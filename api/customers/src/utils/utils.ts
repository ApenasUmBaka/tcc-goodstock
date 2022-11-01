// Libs
import { ClientCustomer, Customer } from "@types";

// Functions
/**
 * A method to check if the value can be a number.
 */
export function toNumber(numb: any): number | undefined {
  if (!numb && numb != 0) return;
  try {
    return Number(numb);
  } catch {
    return;
  }
}

/**
 * A method to transform the customer to clientCustomer
 */
export function customerToClientCustomer(customer: Customer): ClientCustomer {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    organizationId: customer.fk_organizationId,
  };
}
