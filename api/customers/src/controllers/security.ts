// Classes
import { createHash } from "crypto";

/**
 * A class to be used on security cases.
 */
abstract class Security {
  /**
   * A method to get all the neededparams from some request.
   */
  public static filterArgs(neededParams: string[], body: any): any | undefined {
    const params: any = {};

    if (!body) return;

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
        return;
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
}

// Code
export default Security;
