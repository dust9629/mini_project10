import { connectDB } from "@/util/database";
import { IncomingForm } from "formidable";
import os from "os";
// import { uploadImage } from "@/lib/s3"; // S3 업로드 함수 가져오기
// import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // const db = await connectDB();
  const { db, client } = await connectDB();

  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    uploadDir: os.tmpdir(),
  });

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error("폼 파싱 에러:", err);
      client.close();
      return res.status(500).json({ message: "폼 파싱 에러" });
    }

    const { imageUrl, brand, prd_name, prd_price, categories } = fields;
    if (!imageUrl || !brand || !prd_name || !prd_price) {
      client.close();
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const result = await db.collection("products").insertOne({
        imageUrl,
        brand,
        prd_name,
        prd_price,
        categories,
        // amount: parseInt(amount, 10),
      });

      res.status(200).json({ message: "상품이 등록되었습니다.", result });
    } catch (error) {
      console.error("상품 등록에 실패했습니다.:", error);
      res.status(500).json({
        message: "상품 등록에 실패했습니다.",
        error: error.toString(),
      });
    } finally {
      client.close(); // 연결 종료
    }
  });
}
