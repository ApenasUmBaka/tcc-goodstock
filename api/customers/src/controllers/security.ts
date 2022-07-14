// Classes
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
      const value = neededParams[index];
      if (body[value]) {
        params[value] = body[value];
      } else {
        return {};
      }
    }

    return params;
  }
}

// Code
export default Security;
