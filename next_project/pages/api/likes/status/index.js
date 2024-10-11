import { connectDB } from "./../../../../util/database";

export default async function handler(req, res) {
  const { db } = await connectDB();
  const { userId, itemId } = req.query;

  const like = await db.collection("likes").findOne({ userId, itemId });
  res.status(200).json({ liked: !!like });
}
