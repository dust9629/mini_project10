import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
const client = new MongoClient(url); // 옵션 제거

let dbInstance = null;

async function connectDB() {
  if (dbInstance) {
    console.log("이미 MongoDB에 연결되어 있습니다.");
    return dbInstance;
  }
  try {
    await client.connect();
    console.log("MongoDB에 새로 연결되었습니다.");
    const db = client.db("boodle");
    dbInstance = { db, client };
    return dbInstance;
  } catch (error) {
    console.error("MongoDB 연결 실패 =>", error);
    throw error;
  }
}

export { connectDB };
