import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "메소드가 허용되지 않았습니다." });
  }

  const { db, client } = await connectDB();
  const { id } = req.query;

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
