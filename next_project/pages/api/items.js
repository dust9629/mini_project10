import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db("curation");
  const items = await db.collection("boodle").find().toArray();
  client.close(); // 데이터베이스 연결 종료
  res.status(200).json(items);
}
