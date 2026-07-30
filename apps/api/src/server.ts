// index.ts
import 'dotenv/config';
import app from "./app";
import env from "./utils/validateEnv";
import { setServers } from 'node:dns/promises';
import { connectDB } from "./config/connect";

setServers(['1.1.1.1', '8.8.8.8']);

const port = env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();