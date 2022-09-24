// Classes

import { createHash, Hash } from "crypto";

/**
 * A class to be used on security cases.
 */
abstract class Security {
  /**
   * A method to get all the neededparams from some request.
   * @param neededParams - The name from the params.
   * @param body - The request's body.
   * @returns The treated params or empty array if bad request.
   */
  public static filterParams(neededParams: string[], body: any): any {
    const params: any = {};

    if (!body) return {};

    for (const index in neededParams) {
      let value = neededParams[index];
      let optional = false;
      if (value[0] == "?") {
        optional = true;
        value = value.slice(1);
      }

      if (body[value]) {
        params[value] = body[value];
      } else if (!optional) {
        return {};
      }
    }

    return params;
  }

  /**
   * A method to convert to hash.
   */
  public static toHash(value: string) {
    return createHash("sha256").update(value).digest("hex");
  }

  public static isEmailValid(email: string): boolean {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (regex.test(email)) return true;
    return false;
  }
}

// Code
export default Security;
