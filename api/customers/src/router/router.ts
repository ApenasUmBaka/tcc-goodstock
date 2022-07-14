// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/auth";
import CustomersController from "@controllers/customersController";

// Data
const router = Router();
const authMiddleware = new AuthController().authRequest.bind(AuthController);

// Routes
router.use(authMiddleware);

// Customers
router.post("/customers", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.postCustomers(req, res);
});

// router.get("/customers", async (req, res) => {
//   const customersController = new CustomersController();
//   await customersController.getCustomers(req, res);
// });

// router.get("/customers/:id", async (req, res) => {
//   const customersController = new CustomersController();
//   await customersController.getCustomers(req, res);
// });

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
