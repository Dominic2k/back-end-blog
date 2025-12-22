import { Router } from "express";
import { PostsController } from "../modules/posts/posts.controller";
import { CommentsController } from "../modules/comments/comments.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkOwner } from "../middleware/checkOwner.middleware";

const router = Router();
const postsController = new PostsController();
const commentsController = new CommentsController();

router.get("/", postsController.getAll);

router.get("/:id", (req, res, next) => {
    if (/^\d+$/.test(req.params.id)) {
        return postsController.getById(req, res);
    }
    postsController.getBySlug(req, res);
});

router.post("/", authMiddleware, postsController.create);

router.put("/:id", authMiddleware, checkOwner("post"), postsController.update);
router.delete(
    "/:id",
    authMiddleware,
    checkOwner("post"),
    postsController.delete
);

router.post("/:id/comments", authMiddleware, commentsController.create);

export default router;
