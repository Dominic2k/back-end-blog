import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error.middleware";

dotenv.config();
console.log("Env loaded:", process.env.JWT_ACCESS_SECRET ? "yes" : "no");
process.env.JWT_ACCESS_SECRET =
    process.env.JWT_ACCESS_SECRET || "access_key_123";
process.env.JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "your_refresh_secret_key_456";
const app = express();

const allowed = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowed.length === 0) return callback(null, true);
            if (allowed.includes(origin)) return callback(null, true);
            return callback(
                new Error("CORS policy: origin not allowed"),
                false
            );
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api", routes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
