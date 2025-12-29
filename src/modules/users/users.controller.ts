import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { sendSuccess, sendError } from "../../utils/response";

const usersService = new UsersService();

export class UsersController {
    getUser = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const user = await usersService.getUser(id);
            if (!user) return sendError(res, "Người dùng không tồn tại", 404);
            sendSuccess(res, "Lấy thông tin người dùng thành công", user);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getUserPosts = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const data = await usersService.getUserPosts(id, page, limit);
            sendSuccess(
                res,
                "Lấy danh sách bài viết của người dùng thành công",
                data
            );
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    updateUser = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            const user = await usersService.updateUser(id, req.body);
            sendSuccess(res, "Cập nhật thông tin thành công", user);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };
}
