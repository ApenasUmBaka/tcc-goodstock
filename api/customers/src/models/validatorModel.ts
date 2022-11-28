// Libs
import { PatchCustomer, PatchOrganization, PostCustomer } from "@types";

// Classes
class ValidatorModel {
  /**
   * A method to validate the args from a new customer is valid.
   */
  public static isNewCustomerArgsValid(body: PostCustomer): boolean {
    if (!this.isNameValid(body.name!)) return false;
    if (!this.isEmailValid(body.email!)) return false;
    if (!body.password) return true;
    if (!this.isPasswdValid(body.password!)) return false;

    return true;
  }

  /**
   * A method to validate the args from a patch customer request.
   */
  public static getCustomerPatchArgs(
    body: PatchCustomer
  ): PatchCustomer | undefined {
    const patchCustomer: PatchCustomer = {};
    // Check all the args in the body.
    if (body.name) {
      if (!this.isNameValid(body.name)) return;
      patchCustomer.name = body.name;
    }

    if (body.email) {
      if (!this.isEmailValid(body.email)) return;
      patchCustomer.email = body.email;
    }

    if (body.password) {
      if (!this.isPasswdValid(body.password)) return;
      patchCustomer.password = body.password;
    }

    return patchCustomer;
  }

  /**
   * A method to validate the args from a patch organization request.
   */
  public static getOrganizationPatchArgs(
    body: PatchOrganization
  ): PatchOrganization | undefined {
    const patchOrganization: PatchOrganization = {};
    // Check all the args in the body.
    if (body.name) {
      if (!this.isNameValid(body.name)) return;
      patchOrganization.name = body.name;
    }

    if (body.masterPassword) {
      if (!this.isPasswdValid(body.masterPassword)) return;
      patchOrganization.masterPassword = body.masterPassword;
    }

    return patchOrganization;
  }

  /**
   * A method to validate a name.
   */
  public static isNameValid(name: string): boolean {
    if (!name) return false;
    if (name.length < 3) {
      return false;
    }
    return true;
  }

  /**
   * A method to validate a email.
   */
  public static isEmailValid(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
    if (!regexEmail.test(email)) {
      return false;
    }
    return true;
  }

  /**
   * A method to validate a password.
   */
  public static isPasswdValid(passwd: string): boolean {
    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/;
    if (!(passwd.length >= 8 && passwd.length <= 20)) {
      ("A senha deve conter no minimo 8 digitos e máximo 20.");
      return false;
    }

    if (regexPasswd.exec(passwd)) {
      ("A senha deve conter apenas caracteres comuns, evite utilizar caracteres especiais como ' e \".");
      return false;
    }

    return true;
  }

  /**
   * A method to validate an organization id.
   */
  public static isOrgIdValid(orgId: string): boolean {
    if (!(Number(orgId) > 0)) {
      ("O ID da organização deve ser maior que 0 e se referir ao ID correspondente da sua organização.");
      return false;
    }
    return true;
  }
}

// Code
export default ValidatorModel;
