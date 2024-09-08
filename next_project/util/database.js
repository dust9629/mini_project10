import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
let dbInstance = null;

async function connectDB() {
  if (dbInstance) {
    console.log("이미 MongoDB에 연결되어 있습니다.");
    // client.topology를 사용하여 MongoDB 클라이언트가 현재 연결된 상태인지 확인
    if (
      dbInstance.client &&
      dbInstance.client.topology &&
      !dbInstance.client.topology.isConnected()
    ) {
      console.log("MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다.");
      await dbInstance.client.connect();
    }
    return dbInstance;
  }

  try {
    const client = new MongoClient(url);
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
