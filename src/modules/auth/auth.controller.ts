import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";

const authService = new AuthService();

export class AuthController {
    register = async (req: Request, res: Response) => {
        try {
            const user = await authService.register(req.body);
            sendSuccess(res, "Đăng ký thành công", user, 201);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const data = await authService.login(req.body);
            console.log("Login data:", data);
            sendSuccess(res, "Đăng nhập thành công", data);
        } catch (e: any) {
            sendError(res, e.message, 401);
        }
    };

    refresh = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;
            console.log("Refresh request, token:", refreshToken);
            if (!refreshToken) {
                return sendError(res, "Refresh token is required", 400);
            }
            const data = await authService.refresh(refreshToken);
            console.log("Refresh success, new accessToken:", data.accessToken);
            sendSuccess(res, "Token refreshed", data);
        } catch (e: any) {
            console.error("Refresh error:", e.message);
            sendError(res, e.message, 401);
        }
    };

    logout = async (req: Request, res: Response) => {
        sendSuccess(res, "Đăng xuất thành công", null, 204);
    };
}
