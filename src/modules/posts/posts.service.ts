import slugify from "slugify";
import prisma from "../../utils/prisma";

export class PostsService {
    async create(userId: number, data: any) {
        const slug = slugify(data.title, { lower: true }) + "-" + Date.now();
        return await prisma.post.create({
            data: { ...data, slug, authorId: userId },
        });
    }

    async getAll(
        page: number = 1,
        limit: number = 10,
        q?: string,
        author?: string
    ) {
        const skip = (page - 1) * limit;
        const where: any = {};
        if (q) where.title = { contains: q, mode: "insensitive" };
        if (author) where.author = { username: author };

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take: limit,
                include: { author: { select: { username: true } } },
            }),
            prisma.post.count({ where }),
        ]);
        return {
            posts,
            meta: { total, page, lastPage: Math.ceil(total / limit) },
        };
    }

    async getById(id: number) {
        return await prisma.post.findUnique({
            where: { id },
            include: {
                author: { select: { username: true } },
                comments: {
                    include: { author: { select: { username: true } } },
                },
            },
        });
    }

    async getBySlug(slug: string) {
        return await prisma.post.findUnique({
            where: { slug },
            include: {
                author: { select: { username: true } },
                comments: {
                    include: { author: { select: { username: true } } },
                },
            },
        });
    }

    async update(id: number, data: any) {
        return await prisma.post.update({
            where: { id },
            data,
        });
    }

    async publish(id: number) {
        return await prisma.post.update({
            where: { id },
            data: { published: true },
        });
    }

    async unpublish(id: number) {
        return await prisma.post.update({
            where: { id },
            data: { published: false },
        });
    }

    async delete(id: number) {
        return await prisma.post.delete({
            where: { id },
        });
    }
}
