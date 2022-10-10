// Libs
import express, { Request, Response, Router } from "express";

import AuthController from "@controllers/authController";
import LoginController from "@controllers/loginController";
import RegisterController from "@controllers/registerController";
import ContactUsController from "@controllers/contactUsController";

// Data
const router = Router();

// Routes
router.use(AuthController.authRequest);
router.use(express.static("src/views"));
router.use(express.static("build/views"));

router.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

router.get("/register", RegisterController.get);
router.post("/register", RegisterController.post);

router.get("/login", LoginController.get);
router.post("/login", LoginController.post);

router.all("/contact-us", ContactUsController.all);

router.all('*', (req: Request, res: Response) => {
  res.status(404).render('notfound');
});

// Code
export default router;
