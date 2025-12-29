import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

router.get("/profile", authMiddleware, authController.getProfile);

export default router;
