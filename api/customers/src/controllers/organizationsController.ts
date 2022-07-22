// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import organizationsModel from "@models/organizationsModel";
import { _Organization } from "@types";

// Classes
/**
 * A organizations controller.
 */
class OrganizationsController {
  /**
   * POST /organizations
   * A route to create organizations.
   */
  public async postOrganization(req: Request, res: Response) {
    // Check params.
    const neededParams = ["name", "masterPassword"];
    const params = Security.filterParams(neededParams, req.body);
    if (!Object.keys(params).length) {
      req.logger.info("The provided body is not valid. Returning...");
      return res.sendStatus(400);
    }

    // Check if the Organization already exists.
    const findOrganizationResult = await organizationsModel.findOrganization(
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
      const Organization = await organizationsModel.createOrganization(
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
  public async getOrganization(req: Request, res: Response) {
    const query = this.getOrganizationQuery(req);
    if (!query) {
      req.logger.info("The query is empty. Returning...");
      return res.sendStatus(400);
    }

    const findOrganizationResult = await organizationsModel.findOrganization(
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
  public async patchOrganization(req: Request, res: Response) {
    const OrganizationId = req.params.id;
    if (!OrganizationId || !toNumber(OrganizationId)) {
      req.logger.info("The Organization's id was not provided. Returning...");
      return res.sendStatus(400);
    }

    // Find if Organization exists.
    const findOrganizationResult = await organizationsModel.findOrganization(
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

    const updatedOrganization = await organizationsModel.updateOrganization(
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
   * Used by the GET /Organization or GET/Organization/:id
   */
  private getOrganizationQuery(req: Request) {
    if (req.params.id) {
      if (!toNumber(req.params.id)) return;
      return {
        id: req.params.id,
      };
    }

    const neededParams = ["name"];
    const params = Security.filterParams(neededParams, req.body);
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
