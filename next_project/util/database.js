import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

async function connectDB() {
  const client = new MongoClient(url, options);
  try {
    await client.connect();
    console.log("MongoDB 연결된 상태~~~~");
    const db = client.db("boodle");
    return { client, db };
  } catch (error) {
    console.error("MongoDB 연결 실패! 이유는 =>", error);
    throw error; // 에러를 던져 상위 캐치 블록에서 처리할 수 있게 함
  }
}

export { connectDB };
