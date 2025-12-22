import express from "express";
import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
