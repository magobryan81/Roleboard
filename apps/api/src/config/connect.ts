import 'dotenv/config';
import mongoose from "mongoose";
import env from "../utils/validateEnv";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.ATLAS_URI)
    .then(() => {
        console.log("Mongoose connected");
    })
  } catch(error) {
    console.error("MongoDB connection error:", error);
  };
}




