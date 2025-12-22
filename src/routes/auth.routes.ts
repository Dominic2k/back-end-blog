import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";

const router = Router();
const authController = new AuthController();

// Đăng ký tài khoản mới: POST /api/auth/register
router.post("/register", authController.register);

// Đăng nhập: POST /api/auth/login
router.post("/login", authController.login);

// (Sau này bạn có thể thêm các route như /logout, /refresh-token ở đây)

export default router;
