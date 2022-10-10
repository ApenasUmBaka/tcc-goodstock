// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import { RegisterUser } from "@types";
import CustomersModel from "@models/customersModel";

// Classes
class RegisterController {
  public static async get(req: Request, res: Response) {
    res.status(200).render("cad-login", { messageError: "" });
  }

  public static async post(req: Request, res: Response) {
    // Check the params ('name', 'email', 'password', 'organizationId', 'masterPassword')
    const neededParams = [
      "name",
      "email",
      "password",
      "organizationId",
      "masterPassword",
    ];

    if (!Security.filterParams(neededParams, req.body)) {
      req.logger.info(`Some param was not included in the neededParams.`);
      req.logger.info("Returning...");
      return res.status(400).json({
        status: "Error",
        message: `Some field was not sent."`,
      });
    }

    // Check params type
    if (!this.isRegisterUserValid(req.body)) {
      req.logger.info("Some of the params is in the wrong type.");
      req.logger.info("Returning...");
      return res.status(400).json({
        status: "Error",
        message: `Some param has an invalid type.`,
      });
    }

    // Call the API.
    const customersModel = new CustomersModel(req.logger);
    const userData = await customersModel.authCustomer(
      req.body.email,
      req.body.password
    );

    if (!userData) {
      req.logger.info("Could not login with the provided informations.");
      return res.status(400).json({
        status: "Error",
        message: "The provided credentials are invalid.",
      });
    }

    req.session.user = userData;
    res.status(200).json({
      status: "Success",
      data: "Successfully login.",
    });
  }

  private static isRegisterUserValid(body: RegisterUser): boolean {
    if (!body.name || !body.password || !body.masterPassword) return false;
    if (!Security.isEmailValid(body.email!)) return false;
    if (!toNumber(body.organizationId)) return false;
    return true;
  }
}

// Code
export default RegisterController;
