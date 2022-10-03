// Libs
import { Request, Response } from "express";

// Classes
class ContactUsController {
  public static async all(req: Request, res: Response) {
    res.status(200).sendFile("src/views/pages/contact-us.html", { root: "." });
  }
}

// Code
export default ContactUsController;
