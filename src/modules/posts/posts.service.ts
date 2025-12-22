import slugify from "slugify";
import prisma from "../../utils/prisma";

export class PostsService {
    async create(userId: number, data: any) {
        const slug = slugify(data.title, { lower: true }) + "-" + Date.now();
        return await prisma.post.create({
            data: { ...data, slug, authorId: userId },
        });
    }

    async getAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                include: { author: { select: { username: true } } },
            }),
            prisma.post.count(),
        ]);
        return {
            posts,
            meta: { total, page, lastPage: Math.ceil(total / limit) },
        };
    }
}
