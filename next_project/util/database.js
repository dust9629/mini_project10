import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
let dbInstance = null;
let connectingPromise = null;
// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function connectDB() {
  if (dbInstance) {
    console.log("이미 MongoDB에 연결되어 있습니다.");
    return dbInstance;
  }
  if (!connectingPromise) {
    const client = new MongoClient(url);
    connectingPromise = client
      .connect()
      .then(() => {
        console.log("MongoDB에 새로 연결되었습니다.");
        const db = client.db("boodle");
        dbInstance = { db, client };
        return dbInstance;
      })
      .catch((error) => {
        console.error("MongoDB 연결 실패 =>", error);
        connectingPromise = null; // 실패 시 다음 연결 시도를 위해 null 처리
        throw error;
      });
  }
  return connectingPromise;
}

export { connectDB };
