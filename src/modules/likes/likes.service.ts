import prisma from "../../utils/prisma";

export class LikesService {
    async likePost(postId: number, userId: number) {
        // Check if already liked
        const existingLike = await prisma.like.findUnique({
            where: { postId_userId: { postId, userId } },
        });
        if (existingLike) {
            throw new Error("Bạn đã thích bài viết này rồi");
        }

        return await prisma.like.create({
            data: { postId, userId },
        });
    }

    async unlikePost(postId: number, userId: number) {
        const like = await prisma.like.findUnique({
            where: { postId_userId: { postId, userId } },
        });
        if (!like) {
            throw new Error("Bạn chưa thích bài viết này");
        }

        return await prisma.like.delete({
            where: { postId_userId: { postId, userId } },
        });
    }

    async getLikesByPost(postId: number) {
        return await prisma.like.findMany({
            where: { postId },
            include: { user: { select: { username: true } } },
        });
    }

    async getLikeCount(postId: number) {
        return await prisma.like.count({
            where: { postId },
        });
    }
}
