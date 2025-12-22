import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET);
};
