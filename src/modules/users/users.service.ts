import prisma from "../../utils/prisma";

export class UsersService {
    async getUser(id: number) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                createdAt: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        excerpt: true,
                        published: true,
                        createdAt: true,
                    },
                    where: { published: true },
                },
            },
        });
    }

    async getUserPosts(id: number, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            where: { authorId: id, published: true },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });
        const total = await prisma.post.count({
            where: { authorId: id, published: true },
        });
        return { posts, total, page, limit };
    }

    async updateUser(id: number, data: any) {
        return await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                updatedAt: true,
            },
        });
    }
}
