// Libs
import { Request, Response } from "express";
import GraphApiModel from "@models/graphApiModel";
import CustomersModel from "@models/customersModel";

// Classes
class microsoftAuthController {
  public static async get(req: Request, res: Response) {
    const graphApi = new GraphApiModel(req.logger);

    const code = req.query.code;
    if (!code) {
      const redirectUrl = graphApi.getAuthUrl();
      return res.redirect(redirectUrl);
    }

    const accessToken = await graphApi.getAccessToken(code as string);
    if (!accessToken) {
      req.logger.info('The access token has not been defined. Returning...');
      return res.sendStatus(500);
    }

    const userEmail = await graphApi.getUserEmail(accessToken);
    if (!userEmail) {
      req.logger.info('The access token is invalid. Returning...');
      return res.render('cad-login', {messageError: 'Authentication was not completed.'});
    }

    const customersModel = new CustomersModel(req.logger);
    const userId = await customersModel.getIdByEmail(userEmail);


  }
}

// Code
export default microsoftAuthController;