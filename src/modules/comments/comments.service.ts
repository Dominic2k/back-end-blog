import prisma from "../../utils/prisma";

export class CommentsService {
    async create(postId: number, userId: number, data: any) {
        return await prisma.comment.create({
            data: { ...data, postId, authorId: userId },
            include: { author: { select: { username: true } } },
        });
    }

    async getByPostId(postId: number) {
        return await prisma.comment.findMany({
            where: { postId },
            include: { author: { select: { username: true } } },
            orderBy: { createdAt: "desc" },
        });
    }

    async delete(id: number) {
        return await prisma.comment.delete({
            where: { id },
        });
    }
}
