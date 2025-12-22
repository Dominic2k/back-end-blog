import bcrypt from "bcrypt";
import { generateAccessToken } from "../../utils/jwt";
import prisma from "../../utils/prisma";

export class AuthService {
    async register(data: any) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        return await prisma.user.create({
            data: { email: data.email, username: data.username, passwordHash },
        });
    }

    async login(data: any) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (
            !user ||
            !(await bcrypt.compare(data.password, user.passwordHash))
        ) {
            throw new Error("Sai tài khoản hoặc mật khẩu");
        }
        const token = generateAccessToken({ id: user.id, email: user.email });
        return { user, token };
    }
}
