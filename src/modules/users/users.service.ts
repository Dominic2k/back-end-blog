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
