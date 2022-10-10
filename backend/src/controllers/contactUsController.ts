// Libs
import { Request, Response } from "express";

// Classes
class ContactUsController {
  public static async all(req: Request, res: Response) {
    res.status(200).render("contact-us");
  }
}

// Code
export default ContactUsController;
