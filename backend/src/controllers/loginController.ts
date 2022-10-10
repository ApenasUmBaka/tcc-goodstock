// Libs
import { Request, Response } from "express";

import Security from "@security";
import { toNumber } from "@utils";
import { RegisterUser } from "@types";

// Classes
class LoginController {
  public static async get(req: Request, res: Response) {
    res.status(200).render("cad-login", { messageError: "" });
  }

  public static async post(req: Request, res: Response) {
    const neededParams = ["loginEmail", "loginPasswd"];

    const params = Security.filterParams(neededParams, req.body);
    if (!params)
      return res
        .status(400)
        .render("cad-login", {
          error: false,
          messageError: "Algum campo não foi devidamente enviado.",
        });
  }

  private static isCredentialsValid(body: RegisterUser): boolean {
    if (!body.name || !body.password || !body.masterPassword) return false;
    if (!Security.isEmailValid(body.email!)) return false;
    if (!toNumber(body.organizationId)) return false;
    return true;
  }
}

// Code
export default LoginController;
