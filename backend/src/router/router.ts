// Libs
import express, { Request, Response, Router } from "express";

import AuthController from "@controllers/authController";
import LoginController from "@controllers/loginController";
import ContactUsController from "@controllers/contactUsController";
import RegisterController from "@controllers/registerController";

// Data
const router = Router();

// Routes
router.use(AuthController.authRequest);
router.use(express.static("src/views"));
router.use(express.static("build/views"));

router.get("/register", RegisterController.get);
router.post("/register", RegisterController.post);

router.get("/login", LoginController.get);

router.all("/contact-us", ContactUsController.all);

router.get("/", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/index.html", { root: "." });
});

// Code
export default router;
