import { Router } from "express";
import { PostsController } from "../modules/posts/posts.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const postsController = new PostsController();

// API công khai: Ai cũng xem được danh sách bài viết
router.get("/", postsController.getAll);

// API bảo mật: Phải đăng nhập mới được tạo bài viết
router.post("/", authMiddleware, postsController.create);

export default router;
