// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/authController";
import SalesController from "@controllers/salesController";

// Data
const router = Router();
router.use(AuthController.authRequest);

// Routes
router.post("/sales", SalesController.postSale);

router.get("/sales/:id", SalesController.getSale);

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
