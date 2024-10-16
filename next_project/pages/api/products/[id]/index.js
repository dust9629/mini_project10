import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectDB();
  const productId = new ObjectId(req.query.id);
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "메소드가 허용되지 않았습니다." });
  }

  if (req.method === "GET") {
    try {
      const product = await db
        .collection("products")
        .findOne({ _id: productId });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "상품이 성공적으로 삭제되었습니다." });
    } else {
      res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("상품을 삭제할 수 없습니다.", error);
    res.status(500).json({ message: "상품을 삭제할 수 없습니다", error });
  } finally {
    client.close();
  }
}
