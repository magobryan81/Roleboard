import { connectToServer } from "./config/connect";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    await connectToServer();
    console.log(`Server is running on port ${PORT}`);
}); 