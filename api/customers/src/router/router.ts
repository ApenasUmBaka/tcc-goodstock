// Libs
import { Request, Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/authController";
import CustomersController from "@controllers/customersController";
import OrganizationsController from "@controllers/organizationsController";

// Data
const router = Router();

// Customers
router.use(AuthController.auth);


router.get("/customers", CustomersController.getCustomer.bind(CustomersController));
router.post("/customers", CustomersController.postCustomer.bind(CustomersController));

router.get("/customers/:id", CustomersController.getCustomer.bind(CustomersController));
router.patch("/customers/:id", CustomersController.patchCustomer.bind(CustomersController));

router.get("/customers/:id/auth", CustomersController.getAuth.bind(CustomersController));

// Organizations
router.get("/organizations", OrganizationsController.getOrganization.bind(OrganizationsController));
router.post("/organizations", OrganizationsController.postOrganization.bind(OrganizationsController));

router.get("/organizations/auth", OrganizationsController.getAuth.bind(OrganizationsController));

router.get("/organizations/:id", OrganizationsController.getOrganization.bind(OrganizationsController));
router.patch("/organizations/:id", OrganizationsController.patchOrganization.bind(OrganizationsController));

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
