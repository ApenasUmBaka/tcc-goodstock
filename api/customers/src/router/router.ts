// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/auth";

// Data
const router = Router();
const authMiddleware = new AuthController().authRequest.bind(AuthController);

router.all("*", authMiddleware, (req, res) => {
  const logger = LoggerFactory.createLogger(req.ip);
  logger.info("Acessed an unknown route.");
  return res.status(404).json({
    status: "Error",
    message: "Not found",
  });
});

// Code
export default router;
