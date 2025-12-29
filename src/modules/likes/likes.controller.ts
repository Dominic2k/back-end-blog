import { Request, Response } from "express";
import { LikesService } from "./likes.service";
import { sendSuccess, sendError } from "../../utils/response";

const likesService = new LikesService();

export class LikesController {
    likePost = async (req: any, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const userId = req.user.id;
            const like = await likesService.likePost(postId, userId);
            sendSuccess(res, "Thích bài viết thành công", like, 201);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    unlikePost = async (req: any, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const userId = req.user.id;
            await likesService.unlikePost(postId, userId);
            sendSuccess(res, "Bỏ thích bài viết thành công", null, 204);
        } catch (e: any) {
            sendError(res, e.message);
        }
    };

    getLikesByPost = async (req: Request, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const likes = await likesService.getLikesByPost(postId);
            const count = await likesService.getLikeCount(postId);
            sendSuccess(res, "Lấy danh sách thích thành công", {
                likes,
                count,
            });
        } catch (e: any) {
            sendError(res, e.message);
        }
    };
}
