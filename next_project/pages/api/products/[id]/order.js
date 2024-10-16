import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const { userId } = req.body; // 클라이언트로부터 userId 받기 (로그인 시)
  const orderNumber = generateOrderNumber();

  const { db } = await connectDB();

  try {
    const updateData = {
      soldout: true,
      orderNumber,
      ...(userId ? { orderedBy: userId } : {}), // 회원이면 userId 추가
    };

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.status(200).json({ message: "Order processed successfully", result });
  } catch (error) {
    console.error("Failed to process order:", error);
    res.status(500).json({ message: "Failed to process order", error });
  }
}
