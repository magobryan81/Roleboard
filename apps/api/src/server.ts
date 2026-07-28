import 'dotenv/config';
import app from "./app";
import env from "./utils/validateEnv";
import { setServers } from 'node:dns/promises';
import { connectDB } from "./config/connect";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import catchErrors from './utils/catchErrors';
import { APP_ORIGIN } from './constants/env';
import errorHandler from './middleware/errorHandler';


setServers(['1.1.1.1', '8.8.8.8']); 

const port = env.PORT;

// middleware
app.use(cors({
  origin: APP_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check
app.get("/", (_, res) => {
  return res.status(200).json({
    status: "healthy",
  })
});

// error handler
app.use(errorHandler);

const startServer = async () => {
  await connectDB(); // wait for DB connection to succeed FIRST
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}; 

startServer();