// Libs
import express, { Request, Response, Router } from "express";

// Data
const router = Router();

// Routes
router.use(express.static("src/views"));

router.get("/register", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/cad-login.html", { root: "." });
});

router.get("/login", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/cad-login.html", { root: "." });
});

router.get("/", (req: Request, res: Response) => {
  res.status(200).sendFile("src/views/pages/index.html", { root: "." });
});

// Code
export default router;
