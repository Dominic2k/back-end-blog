import { Request, Response } from "express";
import { PostsService } from "./posts.service";
import { sendSuccess, sendError } from "../../utils/response";

const postsService = new PostsService();

export class PostsController {
    create = async (req: any, res: Response) => {
        try {
            const userId = req.user.id;
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
            const q = req.query.q as string;
            const author = req.query.author as string;
            const data = await postsService.getAll(page, limit, q, author);
            sendSuccess(res, "Lấy danh sách bài viết thành công", data);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const post = await postsService.getById(id);
            if (!post) return sendError(res, "Bài viết không tồn tại", 404);
            sendSuccess(res, "Lấy bài viết thành công", post);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getBySlug = async (req: Request, res: Response) => {
        try {
            const slug = req.params.slug;
            const post = await postsService.getBySlug(slug);
            if (!post) return sendError(res, "Bài viết không tồn tại", 404);
            sendSuccess(res, "Lấy bài viết thành công", post);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    update = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            const post = await postsService.update(id, req.body);
            sendSuccess(res, "Cập nhật bài viết thành công", post);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    publish = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            const post = await postsService.publish(id);
            sendSuccess(res, "Xuất bản bài viết thành công", post);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    unpublish = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            const post = await postsService.unpublish(id);
            sendSuccess(res, "Hủy xuất bản bài viết thành công", post);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    delete = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            await postsService.delete(id);
            sendSuccess(res, "Xóa bài viết thành công", null, 204);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };
}
