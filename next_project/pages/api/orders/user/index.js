import { connectDB } from "./../../../../util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { db } = await connectDB();
  const userId = req.query.userId; // 사용자 ID 받기

  try {
    const orders = await db
      .collection("orders")
      .find({ userId: ObjectId(userId) })
      .toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
}
