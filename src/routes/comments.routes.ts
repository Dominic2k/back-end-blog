import { Router } from "express";
import { CommentsController } from "../modules/comments/comments.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkOwner } from "../middleware/checkOwner.middleware";

const router = Router();
const commentsController = new CommentsController();

router.delete(
    "/:id",
    authMiddleware,
    checkOwner("comment"),
    commentsController.delete
);

export default router;
