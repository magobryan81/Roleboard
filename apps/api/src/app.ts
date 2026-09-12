// app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError from "http-errors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import { APP_ORIGIN } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";

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

// auth routes
app.use("/auth", authRoutes);

// user routes
app.use("/user", authenticate, userRoutes);

// session routes
app.use("/sessions", authenticate, sessionRoutes);

// 404
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// error handler
app.use(errorHandler);

export default app;



