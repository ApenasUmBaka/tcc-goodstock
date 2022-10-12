// Libs
import { Request, Response } from "express";

// Classes
class WorkspaceController {
  public static async get(req: Request, res: Response) {
    if (!req.session.user?.id) {
      req.logger.info('The client has not a valid session. Redirecting to /login...');
      return res.redirect('/login');
    }

    res.status(200).render('workspace');
  }
}

// Code
export default WorkspaceController;
