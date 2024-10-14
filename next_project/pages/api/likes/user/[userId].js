import { connectDB } from "./../../../../util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const { db } = await connectDB();
    const items = await db.collection("likes").find({ userId }).toArray();
    return res.status(200).json({ items });
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
