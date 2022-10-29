// Functions
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
