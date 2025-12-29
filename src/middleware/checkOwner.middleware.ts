import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";

export const checkOwner = (model: string, ownerField: string = "authorId") => {
    return async (req: any, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const userId = req.user.id;

        try {
            const record = await (prisma as any)[model].findUnique({
                where: { id: Number(id) },
            });
            if (!record || record[ownerField] !== userId) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };
};
