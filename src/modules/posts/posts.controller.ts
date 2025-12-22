import { Request, Response } from "express";
import { PostsService } from "./posts.service";
import { sendSuccess, sendError } from "../../utils/response";

const postsService = new PostsService();

export class PostsController {
    // Tạo bài viết mới
    create = async (req: any, res: Response) => {
        try {
            const userId = req.user.id; // Lấy từ authMiddleware
            const post = await postsService.create(userId, req.body);
            sendSuccess(res, "Tạo bài viết thành công", post, 201);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const data = await postsService.getAll(page, limit);
            sendSuccess(res, "Lấy danh sách bài viết thành công", data);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };
}
