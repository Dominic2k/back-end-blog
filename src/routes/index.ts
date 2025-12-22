import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import usersRoutes from "./users.routes";
import commentsRoutes from "./comments.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/users", usersRoutes);
router.use("/comments", commentsRoutes);

export default router;
