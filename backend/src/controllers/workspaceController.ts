// Libs
import { Request, Response } from "express";

// Classes
class WorkspaceController {
  public static async get(req: Request, res: Response) {
    if (!req.session.user?.id) {
      req.logger.info(
        "The client has not a valid session. Redirecting to /login..."
      );
      return res.redirect("/login");
    }

    res.status(200).render("work-station", { user: req.session.user! });
  }
}

// Code
export default WorkspaceController;
