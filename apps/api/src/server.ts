import 'dotenv/config';
import app from "./app";
import env from "./utils/validateEnv";
import { setServers } from 'node:dns/promises';
import { connectDB } from "./config/connect";
import express from "express";
import cors from "cors";

setServers(['1.1.1.1', '8.8.8.8']); 

const port = env.PORT;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB(); // wait for DB connection to succeed FIRST
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}; 

startServer();