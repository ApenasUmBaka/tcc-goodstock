// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/auth";
import CustomersController from "@controllers/customersController";
import OrganizationsController from "@controllers/organizationsController";

// Data
const router = Router();
const authMiddleware = new AuthController().authRequest.bind(AuthController);

// Routes
router.use(authMiddleware);

// Customers
router.post("/customers", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.postCustomer(req, res);
});

router.get("/customers", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.getCustomer(req, res);
});

router.get("/customers/:id", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.getCustomer(req, res);
});

router.patch("/customers/:id", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.patchCustomer(req, res);
});

router.get("/customers/:id/auth", async (req, res) => {
  const customersController = new CustomersController();
  await customersController.getAuth(req, res);
});

// Organizations
router.post("/organizations", async (req, res) => {
  const organizationsController = new OrganizationsController();
  await organizationsController.postOrganization(req, res);
});

router.get("/organizations", async (req, res) => {
  const organizationsController = new OrganizationsController();
  await organizationsController.getOrganization(req, res);
});

router.get("/organizations/:id", async (req, res) => {
  const organizationsController = new OrganizationsController();
  await organizationsController.getOrganization(req, res);
});

router.patch("/organizations/:id", async (req, res) => {
  const organizationsController = new OrganizationsController();
  await organizationsController.patchOrganization(req, res);
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
