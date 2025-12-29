import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
    schema: "./prisma/schema.prisma",
    datasource: {
        url: process.env.DATABASE_URL, // Nó sẽ lấy URL từ .env ở đây
    },
});
