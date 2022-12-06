// Libs
import { Request, Response } from "express";

import Security from "@security";
import CustomersModel from "@models/customersModel";
import OrganizationsModel from "@models/organizationsModel";

// Classes
class LoginController {
  public static async get(req: Request, res: Response) {
    if (!req.session.user?.email) {
      return res.status(200).render("cad-login", { messageError: "" });
    }

    res.status(200).redirect("/workspace");
  }

  public static async post(req: Request, res: Response) {
    const neededParams = ["email", "passwd"];

    const params = Security.filterParams(neededParams, req.body);
    if (!params) {
      req.logger.info(
        "Some requested fields was not sent in the request. Returning..."
      );
      return res.status(400).render("cad-login", {
        messageError: "Algum campo não foram devidamente enviado.",
      });
    }

    // Check if customer is valid.
    const customerModel = new CustomersModel(req.logger);
    const authUserResult = await customerModel.authCustomer(params.email, params.passwd);
    if (!authUserResult) {
      req.logger.info("Invalid credentials. Returning...");
      return res.status(400).render("cad-login", {
        messageError: "As credenciais inseridas são inválidas.",
      });
    }

    // Set the customer on the session.
    const org = await new OrganizationsModel(req.logger).findOrganization({
      id: authUserResult.id
    });

    req.session.user = {
      id: authUserResult.id,
      name: authUserResult.name,
      email: authUserResult.email,
      organizationName: org?.name,
      organizationId: org?.id,
    }
    req.session.save();

    res.redirect("/workspace");
  }
}

// Code
export default LoginController;
