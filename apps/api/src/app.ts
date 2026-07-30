// app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError from "http-errors";
import userRoutes from "./routes/auth.routes";
import { APP_ORIGIN } from "./constants/env";
import errorHandler from "./middleware/errorHandler";

const app = express();

// middleware — must come before routes
app.use(cors({
  origin: APP_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// health check
app.get("/", (_req, res) => {
  return res.status(200).json({ status: "healthy" });
});

// routes
app.use("/auth", userRoutes);

// 404
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// error handler
app.use(errorHandler);

export default app;



