import { Request, Response } from "express";

// Classes
class LogoutController {
  public static async get(req: Request, res: Response) {
    if (!req.session.user) {
      req.logger.info("User not logged.");
      return res.sendStatus(401);
    }

    delete req.session.user;
    req.logger.info("Session successfully deleted. Redirecting to /login...");
    res.status(302).redirect("/login");
  }
}

// Code
export default LogoutController;
