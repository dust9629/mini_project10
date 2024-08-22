import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

async function connectDB() {
  const client = new MongoClient(url, options);
  await client.connect();
  return client;
}

export { connectDB };
