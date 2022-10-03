// Libs
import express, { Request, Response, Router } from "express";

import AuthController from "@controllers/authController";
import LoginController from "@controllers/loginController";
import ContactUsController from "@controllers/contactUsController";

// Data
const router = Router();

// Routes
router.use(AuthController.authRequest);
router.use(express.static("src/views"));

router.get("/register", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/cad-login.html", { root: "." });
});

router.get("/login", LoginController.get);

router.all("/contact-us", ContactUsController.all);

router.get("/", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/index.html", { root: "." });
});

// Code
export default router;
