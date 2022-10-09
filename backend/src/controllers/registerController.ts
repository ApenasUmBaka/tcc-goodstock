// Libs
import { Request, Response } from "express";

// Classes
class RegisterController {
  public static async get(req: Request, res: Response) {
    res.status(200).sendFile("src/views/pages/cad-login.html", { root: "." });
  }

  public static async post(req: Request, res: Response) {
    res.status(200).send('Not implemented.');
  }
}

// Code
export default RegisterController;
