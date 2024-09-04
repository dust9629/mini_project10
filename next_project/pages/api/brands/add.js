import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { db } = await connectDB();
  const { imageUrl, content } = req.body;

  try {
    const result = await db.collection("brands").insertOne({
      imageUrl,
      content,
    });
    res
      .status(200)
      .json({ message: "브랜드가 등록되었습니다.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "브랜드 등록에 실패했습니다.", error });
  }
}
