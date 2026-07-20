import { Db, MongoClient, ServerApiVersion } from "mongodb";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database: Db;

export const connectToServer = async () => {
  await client.connect();
  database = client.db("roleboard");
  console.log("Connected to MongoDB");
};

export const getDb = (): Db => {
  return database;
};

