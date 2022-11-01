// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import { ReqOrgAuth } from "@types";
import OrganizationsModel from "@models/organizationsModel";

// Classes
/**
 * A organizations controller.
 */
class OrganizationsController {
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
      return res.sendStatus(400);
    }

    // Check if the Organization already exists.
    const findOrganizationResult = await OrganizationsModel.findOrganization(
      req.logger,
      {
        name: params.name,
      }
    );

    if (findOrganizationResult) {
      req.logger.info("The Organization already exists. Returning...");
      return res.status(400).json({
        status: "Error",
        message: "This organization name already has been taken.",
      });
    }

    // Create the new Organization.
    try {
      const OrganizationParams = {
        name: params.name,
        masterPassword: Security.toHash(params.masterPassword),
      };
      const Organization = await OrganizationsModel.createOrganization(
        req.logger,
        OrganizationParams
      );
      req.logger.info("Returning result...");
      res.status(201).json({
        status: "Success",
        data: Organization,
      });
    } catch {
      req.logger.warn("Returning internal server error...");
      res.sendStatus(500);
    }
  }

  /**
   * GET /Organization or GET /Organization/:id
   * A route to get some Organization.
   */
  public static async getOrganization(req: Request, res: Response) {
    const query = this.getOrganizationQuery(req);
    if (!query) {
      req.logger.info("The query is empty. Returning...");
      return res.sendStatus(400);
    }

    const findOrganizationResult = await OrganizationsModel.findOrganization(
      req.logger,
      query
    );

    if (findOrganizationResult) {
      req.logger.info(
        `The organization ${findOrganizationResult.id} was found. Returning...`
      );
      return res.status(200).json({
        status: "Success",
        data: {
          id: findOrganizationResult.id,
          name: findOrganizationResult.name,
        },
      });
    }

    req.logger.info("The organization was not found. Returning...");
    return res.status(400).json({
      status: "Error",
      message: "The organization was not found",
    });
  }

  /**
   * PATCH /organizations/:id
   * A route to update a Organization.
   */
  public static async patchOrganization(req: Request, res: Response) {
    const OrganizationId = req.params.id;
    if (!OrganizationId || !toNumber(OrganizationId)) {
      req.logger.info("The Organization's id was not provided. Returning...");
      return res.sendStatus(400);
    }

    // Find if Organization exists.
    const findOrganizationResult = await OrganizationsModel.findOrganization(
      req.logger,
      {
        id: OrganizationId,
      }
    );
    if (!findOrganizationResult) {
      req.logger.info(
        "The provided organization's id was not found. Returning..."
      );
      return res.status(400).json({
        status: "Error",
        message: "The provided id was not found.",
      });
    }

    // Update the Organization.
    const organizationsParams = {
      name: req.body.name ? req.body.name : findOrganizationResult.name,
      masterPassword: req.body.masterPassword
        ? req.body.masterPassword
        : findOrganizationResult.masterPassword,
    };

    const updatedOrganization = await OrganizationsModel.updateOrganization(
      req.logger,
      Number(OrganizationId),
      organizationsParams
    );

    return res.status(200).json({
      status: "Success",
      data: {
        id: updatedOrganization.id,
        name: updatedOrganization.name,
        masterPassword: updatedOrganization.masterPassword,
      },
    });
  }

  /**
   * GET /organizations/auth
   * A route to auth with some organization.
   */
  public static async getAuth(req: Request, res: Response) {
    const neededParams = ["organizationId", "organizationPasswd"];

    req.logger.info("Checking params...");
    const params = Security.filterArgs(neededParams, req.body) as ReqOrgAuth;
    if (!params || !toNumber(params.organizationId)) {
      req.logger.info("Invalid params. Returning...");
      return res.sendStatus(400);
    }

    // Check if the ID exists.
    req.logger.info("Checking if the provided ID exists...");
    const organizationResult = await OrganizationsModel.findOrganization(
      req.logger,
      {
        id: params.organizationId,
      }
    );
    if (!organizationResult) {
      req.logger.info("The organization ID was not found. Returning...");
      return res.sendStatus(400);
    }
    req.logger.info("Organization ID Found.");

    // Check if the password is correct.
    req.logger.info(
      "Trying to auth the masterPassword with the organization..."
    );
    const authResult = await OrganizationsModel.findOrganization(req.logger, {
      id: params.organizationId,
      masterPassword: params.organizationPasswd?.toString(),
    });
    if (!authResult) {
      req.logger.info("The provided credential is not valid. Returning...");
      return res.sendStatus(403);
    }

    req.logger.info(
      "The auth operation was successfully completed. Returning..."
    );
    return res.sendStatus(200);
  }

  /**
   * Used by the GET /Organization or GET/Organization/:id
   */
  private static getOrganizationQuery(req: Request) {
    if (req.params.id) {
      if (!toNumber(req.params.id)) return;
      return {
        id: req.params.id,
      };
    }

    const neededParams = ["name"];
    const params = Security.filterArgs(neededParams, req.body);
    if (Object.keys(params).length) {
      return {
        name: params.name,
      };
    }

    return;
  }
}

// Code
export default OrganizationsController;
