import { setServers } from 'node:dns/promises';
import { connectToServer } from "./config/connect";
import express from "express";
import cors from "cors";
setServers(['1.1.1.1', '8.8.8.8']); 
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello, World!');
})

app.listen(PORT, async () => {
    await connectToServer();
    console.log(`Server is running on port ${PORT}`);
}); 