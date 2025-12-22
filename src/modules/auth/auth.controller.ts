import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";

const authService = new AuthService();

export class AuthController {
    register = async (req: Request, res: Response) => {
        try {
            const user = await authService.register(req.body);
            sendSuccess(res, "Đăng ký thành công", { id: user.id }, 201);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const data = await authService.login(req.body);
            sendSuccess(res, "Đăng nhập thành công", data);
        } catch (e: any) {
            sendError(res, e.message, 401);
        }
    };
}
