// Libs
import { Router } from "express";

import LoggerFactory from "@logger";
import AuthController from "@controllers/authController";
import ProductsController from "@controllers/productsController";

// Data
const router = Router();
router.use(AuthController.authRequest);

// Customers
router.post("/products", ProductsController.postProducts.bind(ProductsController));

router.get("/products/:organizationId/", ProductsController.getProduct.bind(ProductsController));

router.get(
  "/products/:organizationId/:productId",
  ProductsController.getProduct.bind(ProductsController)
);

router.patch(
  "/products/:organizationId/:productId",
  ProductsController.patchProduct.bind(ProductsController)
);

router.delete(
  "/products/:organizationId/:productId",
  ProductsController.deleteProduct.bind(ProductsController)
);

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
