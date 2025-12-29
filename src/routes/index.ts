import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import usersRoutes from "./users.routes";
import commentsRoutes from "./comments.routes";
import likesRoutes from "./likes.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/users", usersRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", likesRoutes);

export default router;
