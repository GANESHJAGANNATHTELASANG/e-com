import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { createTables } from "./utils/creatTables.js";
import authRouter from "./routers/authRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  }),
);

app.use("/api/v1/auth", authRouter);

createTables();

app.use(errorMiddleware);

export default app;
