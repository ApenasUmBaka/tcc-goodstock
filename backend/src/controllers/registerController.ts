// Libs
import { Logger } from "winston";
import { Request, Response } from "express";

import Security from "@security";
import { RequestRegisterUserBody } from "@types";
import OrganizationsModel from "@models/organizationsModel";
import ValidatorController from "@controllers/validatorController";

// Classes
class RegisterController {
  public static async get(req: Request, res: Response) {
    res.status(200).render("cad-login", { messageError: "" });
  }

  public static async post(req: Request, res: Response) {
    console.log(JSON.stringify(req.body, null, 4));
    if (!this.postCheckParams(req.logger, req.body)) {
      req.logger.info('The request has some invalid param. Returning...');
      return res.status(400).render("cad-login", {
        messageError: "Algum campo não foi devidamente enviado.",
      });
    }

    const params: RequestRegisterUserBody = req.body;
    // Check if the email has already been taken.
    if (await ValidatorController.isEmailTaken(req.logger, params.registerEmail)) {
      req.logger.info('The provided email has already been taken. Returning...');
      return res.status(400).render('cad-login', {
        messageError: "O email fornecido já está sendo utilizado por uma conta."
      });
    }

    // Check if the organization password is valid.
    const orgModel = new OrganizationsModel(req.logger);
    const authResult = await orgModel.authOrganization(params.registerOrgId, params.registerOrgPasswd);
    
    if (!authResult) {
      req.logger.info('The provided organization is not valid. Returning...');
      return res.status(400).render('cad-login', {
        messageError: "A autenticação com a organização não foi realizada."
      });
    }

    // Create the user.
    req.logger.info('All the data is valid. Creating new user...');


    // Set the user in the session.

    res.status(200).redirect('/workspace');
  }

  /**
   * A method to check the params from the route POST /register.
   * @param body 
   */
  private static postCheckParams(logger: Logger, body: any): boolean {
    // Check the params ('name', 'email', 'password', 'organizationId', 'masterPassword')
    const neededParams = [
      "registerName",
      "registerEmail",
      "registerPasswd",
      "registerOrgId",
      "registerOrgPasswd",
    ];

    if (!Security.filterParams(neededParams, body)) {
      return false;
    }

    // Check params type
    if (!ValidatorController.isRegisterUserValid(logger, body)) {
      return false;
    }

    return true;
  }
}

// Code
export default RegisterController;
