// Libs
import { Router, Request, Response } from "express";

import AuthController from "@controllers/auth";
import RedictController from "@controllers/redictController";

// Data
const router = Router();
const authController = new AuthController();

// Code
router.all("*", authController.authRequest, RedictController.allRedirect);

export default router;