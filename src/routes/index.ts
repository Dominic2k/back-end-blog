import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";

const router = Router();

// Gắn tiền tố /auth cho các route trong authRoutes
router.use("/auth", authRoutes);

// Gắn tiền tố /posts cho các route trong postRoutes
router.use("/posts", postRoutes);

export default router;
