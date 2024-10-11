import { connectDB } from "../../../util/database";

export default async function handler(req, res) {
  const { db } = await connectDB();
  const { userId, itemId } = req.body;

  if (req.method === "POST") {
    // 좋아요 추가
    const result = await db
      .collection("likes")
      .updateOne(
        { userId, itemId },
        { $set: { userId, itemId } },
        { upsert: true }
      );
    return res.status(201).json({ message: "Like added" });
  } else if (req.method === "DELETE") {
    // 좋아요 제거
    await db.collection("likes").deleteOne({ userId, itemId });
    return res.status(200).json({ message: "Like removed" });
  }
}
