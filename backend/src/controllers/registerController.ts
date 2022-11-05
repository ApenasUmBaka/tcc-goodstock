// Libs
import { Logger } from "winston";
import { Request, Response } from "express";

import Security from "@security";
import {
  RequestRegisterUserLoginOrg,
  RequestRegisterUserRegisterOrg,
} from "@types";
import OrganizationsModel from "@models/organizationsModel";
import ValidatorController from "@controllers/validatorController";
import CustomersModel from "@models/customersModel";

// Classes
class RegisterController {
  public static async get(req: Request, res: Response) {
    if (!req.session.user?.email) {
      return res.status(200).render("cad-login", { messageError: "" });
    }

    res.status(200).render("workstation");
  }

  public static async post(req: Request, res: Response) {
    // Check the params.
    const neededParams = ["name", "email", "password"];

    if (!Security.filterParams(neededParams, req.body)) {
      req.logger.info("The request has some invalid param. Returning...");
      return res.status(400).render("cad-login", {
        messageError: "Algum campo não foi devidamente enviado.",
      });
    }

    // Check the organization.
    req.logger.info("Checking the organization informations...");
    let orgId: number | undefined;
    const body: RequestRegisterUserRegisterOrg | RequestRegisterUserLoginOrg =
      req.body;
    if (req.body.registerAccountRegisterOrganization) {
      req.logger.info("The [CREATE] organization was called.");
      orgId = await this.createOrganization(req.logger, body as any);
    } else {
      req.logger.info("The [FIND] organization was called.");
      orgId = await this.findOrganization(req.logger, body as any);
    }

    if (!orgId) {
      return res.status(400).render("cad-login", {
        messageError: "O id da organização está incorreto.",
      });
    }

    // Try to auth with the organization
    req.logger.info("Trying to auth with the organization...");
    const orgModel = new OrganizationsModel(req.logger);
    if (!(await orgModel.authOrganization(orgId, body.masterPassword))) {
      return res.status(401).render("cad-login", {
        messageError: "Não foi possivel se autenticar com a organização.",
      });
    }

    // Create the user.
    req.logger.info("All the data is valid. Creating new user...");
    const customersModel = new CustomersModel(req.logger);
    const customer = await customersModel.createCustomer(
      body.name,
      body.email,
      body.password,
      orgId
    );
    if (!customer) {
      return res.status(500).render("cad-login", {
        messageError: "O usuário não foi criado devido a um erro no servidor.",
      });
    }

    // Set the user in the session.
    req.session.user!.id = customer.id;
    req.session.user!.name = customer.name;
    req.session.user!.email = customer.email;
    req.session.user!.organizationId = customer.organizationId;
    req.session.save();

    // Redirect to the workspace.
    res.status(200).redirect("/workspace");
  }

  /**
   * A method to create an organization and return the id.
   */
  private static async createOrganization(
    logger: Logger,
    body: RequestRegisterUserRegisterOrg
  ): Promise<number | undefined> {
    // Check the params.
    const neededParamsToRegisterOrg = ["organizationName", "masterPassword"];
    if (!Security.filterParams(neededParamsToRegisterOrg, body)) {
      return;
    }

    // Try to create the organization.
    const organizationsModel = new OrganizationsModel(logger);
    const createdOrganization = await organizationsModel.createOrganization(
      body.organizationName,
      body.masterPassword
    );

    // Return the result.
    if (!createdOrganization) return;
    return createdOrganization.id;
  }

  /**
   * A method to find an organization and return the id.
   */
  private static async findOrganization(
    logger: Logger,
    body: RequestRegisterUserLoginOrg
  ): Promise<number | undefined> {
    // Check the params.
    const neededParamsToRegisterOrg = ["organizationId", "masterPassword"];
    if (!Security.filterParams(neededParamsToRegisterOrg, body)) {
      return;
    }

    // Try to create the organization.
    const organizationsModel = new OrganizationsModel(logger);
    const createdOrganization = await organizationsModel.findOrganization(
      body.organizationId
    );

    // Return the result.
    if (!createdOrganization) return;
    return createdOrganization.id;
  }
}

// Code
export default RegisterController;
