// Libs
import { Request, Response } from "express";
import GraphApiModel from "@models/graphApiModel";
import CustomersModel from "@models/customersModel";

// Classes
class microsoftAuthController {
  public static async get(req: Request, res: Response) {
    const graphApi = new GraphApiModel(req.logger);

    const code = req.query.code;
    if (req.query.error) {
      req.logger.warn(
        `Error on trying to auth with Microsoft. Error: ${req.query.error}`
      );
      return res.status(302).render("cad-login", {
        route: "/register",
        messageError: "Erro ao tentar se autenticar com a Microsoft.",
      });
    }
    if (!code) {
      const redirectUrl = graphApi.getAuthUrl();
      return res.redirect(redirectUrl);
    }

    const accessToken = await graphApi.getAccessToken(code as string);
    if (!accessToken) {
      req.logger.info("The access token has not been defined. Returning...");
      return res.sendStatus(500);
    }

    const userEmail = await graphApi.getUserEmail(accessToken);
    if (!userEmail) {
      req.logger.info("The access token is invalid. Returning...");
      return res.render("cad-login", {
        messageError: "Authentication was not completed.",
      });
    }
    const userName = await graphApi.getUserName(accessToken);

    // Try to find if the customer exists.
    req.logger.info("Trying to find the customer in the database...");
    const customersModel = new CustomersModel(req.logger);
    const customer = await customersModel.getCustomerByEmail(userEmail);
    if (customer?.name) {
      req.logger.info("The customer was found. Redirecting to /woskspace...");
      req.session.user = customer;
      return res.status(302).redirect("/workspace");
    }

    // Redirect the user to the cad login and wait for his register.
    req.session.microsoftRegister = true;
    req.logger.info("Rendering the user to cad-login...");
    res.status(302).render("cad-login", {
      microsoftName: userName,
      microsoftEmail: userEmail,
      route: "/register",
      messageError:
        "Revise seu nome e email. Caso tudo esteja correto, apenas prossiga.",
    });
  }
}

// Code
export default microsoftAuthController;
