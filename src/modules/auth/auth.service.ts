import bcrypt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../../utils/jwt";
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
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
        });
        const refreshToken = generateRefreshToken({ id: user.id });
        return { user, accessToken, refreshToken };
    }

    async refresh(refreshToken: string) {
        try {
            console.log(
                "Verifying refresh token with secret:",
                process.env.JWT_REFRESH_SECRET
            );
            const decoded = verifyRefreshToken(refreshToken) as { id: string };
            console.log("Decoded refresh token:", decoded);
            const userId = parseInt(decoded.id);
            console.log("Parsed userId:", userId);
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            console.log("User found:", !!user);
            if (!user) {
                throw new Error("User not found");
            }
            const newAccessToken = generateAccessToken({
                id: user.id,
                email: user.email,
            });
            console.log("New accessToken generated");
            return { accessToken: newAccessToken };
        } catch (error) {
            console.error("Refresh service error:", error);
            throw new Error("Invalid refresh token");
        }
    }
}
