// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/auth";
import SalesController from "@controllers/salesController";

// Data
const router = Router();
const authMiddleware = new AuthController().authRequest.bind(AuthController);

// Routes
router.use(authMiddleware);

router.get('/sales/:id', (req, res) => {
  const salesController = new SalesController();
  salesController.getSale(req, res);
});

router.all("*", (req, res) => {
  const logger = LoggerFactory.createLogger(req.ip);
  logger.info("Acessed an unknown route.");
  return res.status(404).json({
    status: "Error",
    message: "Not found",
  });
});

// Code
export default router;
