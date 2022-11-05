// Libs
import express, { Request, Response, Router } from "express";

import AuthController from "@controllers/authController";
import LoginController from "@controllers/loginController";
import RegisterController from "@controllers/registerController";
import ContactUsController from "@controllers/contactUsController";
import WorkspaceController from "@controllers/workspaceController";
import microsoftAuthController from "@controllers/microsoftAuthController";

// Data
const router = Router();

// Routes
router.use(AuthController.authRequest);
router.use(express.static("src/views"));
router.use(express.static("build/views"));

router.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

router.get(
  "/microsoftAuth",
  microsoftAuthController.get.bind(microsoftAuthController)
);

router.get("/register", RegisterController.get.bind(RegisterController));
router.post("/register", RegisterController.post.bind(RegisterController));

router.get("/login", LoginController.get.bind(LoginController));
router.post("/login", LoginController.post.bind(LoginController));

router.get("/workspace", WorkspaceController.get.bind(WorkspaceController));

router.all("/contact-us", ContactUsController.all.bind(ContactUsController));

router.all("*", (req: Request, res: Response) => {
  res.status(404).render("notfound");
});

// Code
export default router;
