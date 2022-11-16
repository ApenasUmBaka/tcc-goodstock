// Libs
import { Request, Response } from "express";

import Security from "@security";
import { Organization, ReqOrgAuth } from "@types";
import ValidatorModel from "@models/validatorModel";
import OrganizationsModel from "@models/organizationsModel";
import { organizationToClientOrganization, toNumber } from "@utils";

// Classes
/**
 * A organizations controller.
 */
class OrganizationsController {
  /**
   * GET /Organization or GET /Organization/:id
   * A route to get some Organization.
   */
  public static async getOrganization(req: Request, res: Response) {
    // Check if the request has an param.
    const searchQuery: any = {};

    if (toNumber(req.params.id)) searchQuery.id = req.params.id;
    if (
      req.query.name &&
      ValidatorModel.isNameValid(req.query.name as string)
    ) {
      searchQuery.name = req.query.name;
    }

    if (!Object.keys(searchQuery).length) {
      req.logger.info("The query is empty. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Any query/param was send.",
      });
    }

    // Get the organization
    const organizationsModel = new OrganizationsModel(req.logger);
    const organizationResult = (await organizationsModel.findOrganization(
      searchQuery
    )) as Organization;

    if (!organizationResult) {
      req.logger.info("The organization was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The organization was not found.",
      });
    }

    req.logger.info(`The organization was found. Returning...`);
    return res.status(200).json({
      status: "Success",
      data: organizationToClientOrganization(organizationResult),
    });
  }

  /**
   * GET /organizations/auth
   * A route to auth with some organization.
   */
  public static async getAuth(req: Request, res: Response) {
    // Check if the request has an param.
    req.logger.info("Checking params...");
    const searchQuery: any = {};

    if (toNumber(req.params.id)) searchQuery.id = req.params.id;
    if (toNumber(req.query.id)) searchQuery.id = req.query.id;

    if (!Object.keys(searchQuery).length) {
      req.logger.info("The searchQuery is empty. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Any query/param was send.",
      });
    }

    // Find the organizations.
    req.logger.info("Trying to find the organization...");
    const organizationsModel = new OrganizationsModel(req.logger);
    const organization = (await organizationsModel.findOrganization(
      searchQuery
    )) as Organization;
    if (!organization) {
      req.logger.info("The organization was not found. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The organization was not found.",
      });
    }

    // Set the password and search in the database.
    req.logger.info("Trying to auth the organization in the database...");
    searchQuery.masterPassword = Security.toHash(
      (req.query.masterPassword as string) || ""
    );
    const organizationWithPasswd = (await organizationsModel.findOrganization(
      searchQuery
    )) as Organization;

    // Return the result to the client.
    if (!organizationWithPasswd) {
      req.logger.info("The organization was not authorized. Returning...");
      return res.status(401).json({
        status: "Error",
        message: "The organization was not authorized.",
      });
    }

    req.logger.info("The organization was authorized. Returning...");
    res.status(200).json({
      status: "Success",
      data: organizationToClientOrganization(organizationWithPasswd),
    });
  }

  /**
   * POST /organizations
   * A route to create organizations.
   */
  public static async postOrganization(req: Request, res: Response) {
    // Check params.
    const neededParams = ["name", "masterPassword"];
    const params = Security.filterArgs(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The provided body is not valid. Returning...",
      });
    }

    // Check if the Organization already exists.
    const organizationsModel = new OrganizationsModel(req.logger);
    const findOrganizationResult = await organizationsModel.findOrganization({
      name: params.name,
    });

    if (findOrganizationResult) {
      req.logger.info("The Organization already exists. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "This organization name already has been taken.",
      });
    }

    // Create the new Organization.
    const organizationParams = {
      name: params.name,
      masterPassword: Security.toHash(params.masterPassword),
    };

    const organization = await organizationsModel.createOrganization(
      organizationParams
    );

    // Return the result to the client.
    if (!organization) {
      req.logger.warn("Returning internal server error...");
      return res.status(500).json({
        status: "Error",
        message: "Internal server error.",
      });
    }

    req.logger.info("Returning result...");
    res.status(201).json({
      status: "Success",
      data: organizationToClientOrganization(organization),
    });
  }

  /**
   * PATCH /organizations/:id
   * A route to update a Organization.
   */
  public static async patchOrganization(req: Request, res: Response) {
    const organizationId = toNumber(req.params.id);
    if (!organizationId) {
      req.logger.info("The Organization's id was not provided. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "The Organization's id was not send.",
      });
    }

    // Find if Organization exists.
    req.logger.info(`Searching by the organization's ID...`);
    const organizationsModel = new OrganizationsModel(req.logger);
    const findOrganizationResult = await organizationsModel.findOrganization({
      id: organizationId,
    });

    if (!findOrganizationResult) {
      req.logger.info(
        "The provided organization's id was not found. Returning..."
      );
      return res.status(400).json({
        status: "Error",
        message: "The provided id was not found.",
      });
    }

    // Get all the args in the body and test it.
    const patchOrganization = ValidatorModel.getOrganizationPatchArgs(req.body);

    if (!patchOrganization) {
      req.logger.info("Some param in invalid. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "Some argument is invalid.",
      });
    }

    // Update the Organization.
    const updatedOrganization = await organizationsModel.updateOrganization(
      organizationId,
      patchOrganization
    );

    if (!updatedOrganization) {
      return res.status(500).json({
        status: "Error",
        message: "Internal server error.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: organizationToClientOrganization(updatedOrganization),
    });
  }
}

// Code
export default OrganizationsController;
