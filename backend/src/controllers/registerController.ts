// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import { RequestRegisterUserBody } from "@types";
import CustomersModel from "@models/customersModel";
import { Logger } from "winston";

// Classes
class RegisterController {
  public static async get(req: Request, res: Response) {
    res.status(200).render("cad-login", { messageError: "" });
  }

  public static async post(req: Request, res: Response) {
    // Check the params ('name', 'email', 'password', 'organizationId', 'masterPassword')
    const neededParams = [
      "registerName",
      "registerEmail",
      "registerPasswd",
      "registerOrgId",
      "registerOrgPasswd",
    ];

    if (!Security.filterParams(neededParams, req.body)) {
      req.logger.info('Some requested fields was not sent in the request. Returning...');
      return res.status(400).render("cad-login", {
          messageError: "Algum campo não foi devidamente enviado.",
        });
    }

    // Check params type
    const params = req.body as RequestRegisterUserBody;
    if (!this.isRegisterUserValid(req.body)) {
      req.logger.info("Some of the params is in the wrong type. Returning...");
      return res.status(400).render('cad-login', {
        messageError: "Algum campo não foi devidamente enviado."
      });
    }

    // Check if the email has already been taken.
    if (await this.isEmailAreadyTaken(req.logger, params.registerEmail)) {
      req.logger.info('The provided email has already been taken. Returning...');
      return res.status(400).render('cad-login', {
        messageError: "O email fornecido já está sendo utilizado por uma conta."
      });
    }

    // Check if the organization password is valid.
    // Create the user.
    // Set the user in the session.

    res.status(200).redirect('/workspace');
  }

  /**
   * A method to check if the email already has an account linked.
   */
  private static async isEmailAreadyTaken(logger: Logger, email: string): Promise<boolean> {
    logger.info('Checking if the email already has been taken...');
    const customersModel = new CustomersModel(logger);
    const userId = await customersModel.getIdByEmail(email);
    if (userId) {
      logger.info('The email has already been taken...');
      return false;
    }

    return true;
  }

  /**
   * A method to check if the user has valid credentials.
   */
  private static isRegisterUserValid(body: RequestRegisterUserBody): boolean {
    // Check email
    if (!Security.isEmailValid(body.registerEmail)) return false;

    // Check passwd
    if (!Security.isPasswdValid(body.registerPasswd)) return false;

    // Check organizationID
    const orgId = toNumber(body.registerOrgId);
    if (!orgId || (orgId > 0)) return false;

    // Check orgPasswd
    if (!Security.isPasswdValid(body.registerOrgPasswd)) return false;

    return true;
  }
}

// Code
export default RegisterController;
