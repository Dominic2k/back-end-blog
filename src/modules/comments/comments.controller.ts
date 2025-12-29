import { Request, Response } from "express";
import { CommentsService } from "./comments.service";
import { sendSuccess, sendError } from "../../utils/response";

const commentsService = new CommentsService();

export class CommentsController {
    create = async (req: any, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const userId = req.user.id;
            const comment = await commentsService.create(
                postId,
                userId,
                req.body
            );
            sendSuccess(res, "Thêm bình luận thành công", comment, 201);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getByPostId = async (req: Request, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const comments = await commentsService.getByPostId(postId);
            sendSuccess(res, "Lấy danh sách bình luận thành công", comments);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    delete = async (req: any, res: Response) => {
        try {
            const id = Number(req.params.id);
            await commentsService.delete(id);
            sendSuccess(res, "Xóa bình luận thành công", null, 204);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };
}
