import { MongoClient, ServerApiVersion } from "mongodb";

// const db_username = process.env.DB_USER;
// const db_password = process.env.DB_PASSWORD;

// const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.dmwxvyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb://localhost:27017/";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let animalCollection: unknown;
let categoryCollection: unknown;

const connectDB = async () => {
  try {
    await client.connect();
    const db = client.db("apolosis");
    animalCollection = db.collection("animals");
    categoryCollection = db.collection("categories");

    console.log("Connected to the MongoDB database.");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export { connectDB, animalCollection, categoryCollection };
