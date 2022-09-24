// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import ProductsController from "@controllers/productsController";

// Data
const router = Router();
const authMiddleware = new AuthController().authRequest.bind(AuthController);

// Customers
router.post("/products", async (req, res) => {
  const productsController = new ProductsController();
  await productsController.postProducts(req, res);
});

router.get("/products/:organizationId/", async (req, res) => {
  const productsController = new ProductsController();
  await productsController.getProduct(req, res);
});

router.get("/products/:organizationId/:productId", async (req, res) => {
  const productsController = new ProductsController();
  await productsController.getProduct(req, res);
});

router.patch("/products/:organizationId/:productId", async (req, res) => {
  const productsController = new ProductsController();
  await productsController.patchProduct(req, res);
});

router.delete("/products/:organizationId/:productId", async (req, res) => {
  const productsController = new ProductsController();
  await productsController.deleteProduct(req, res);
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
