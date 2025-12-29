import { Router } from "express";
import { LikesController } from "../modules/likes/likes.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const likesController = new LikesController();

router.post("/:id/like", authMiddleware, likesController.likePost);
router.delete("/:id/like", authMiddleware, likesController.unlikePost);
router.get("/:id/likes", likesController.getLikesByPost);

export default router;
