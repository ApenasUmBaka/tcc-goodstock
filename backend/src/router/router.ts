// Libs
import express, { Request, Response, Router } from "express";

import AuthController from "@controllers/authController";
import LoginController from "@controllers/loginController";
import LogoutController from "@controllers/logoutController";
import RegisterController from "@controllers/registerController";
import ContactUsController from "@controllers/contactUsController";
import WorkspaceController from "@controllers/workspaceController";
import microsoftAuthController from "@controllers/microsoftAuthController";
import ProductsController from "@controllers/productsController";

// Data
const router = Router();

// Routes
// Middlewares and files.
router.use(AuthController.authRequest);
router.use(express.static("src/views"));
router.use(express.static("build/views"));

// Index and basics
router.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});
router.get("/logout", LogoutController.get.bind(LogoutController));
router.all("/contact-us", ContactUsController.all.bind(ContactUsController));

// Login and Register
router.get("/register", RegisterController.get.bind(RegisterController));
router.post("/register", RegisterController.post.bind(RegisterController));

router.get("/login", LoginController.get.bind(LoginController));
router.post("/login", LoginController.post.bind(LoginController));

router.get(
  "/microsoftAuth",
  microsoftAuthController.get.bind(microsoftAuthController)
);

// Workspace
router.get("/workspace", WorkspaceController.get.bind(WorkspaceController));

// Products
router.get('/products/', ProductsController.getProductsByQuery.bind(ProductsController));
router.get('/products/:productId', ProductsController.getProductById.bind(ProductsController));
router.post('/products/', ProductsController.postProduct.bind(ProductsController));
router.patch('/products/:productId', ProductsController.patchProduct.bind(ProductsController));
router.delete('/products/:productId', ProductsController.deleteProduct.bind(ProductsController));

// All
router.all("*", (req: Request, res: Response) => {
  res.status(404).render("notfound");
});

// Code
export default router;
