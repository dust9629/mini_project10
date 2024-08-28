import { connectDB } from "@/util/database";
import { uploadImage } from "@/lib/s3"; // S3 업로드 함수 가져오기

const formidable = require("formidable").default;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "메소드가 허용되지 않음." });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: "/public/images", // 적절한 업로드 경로 설정
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("폼 파싱 에러:", err);
      return res.status(500).json({ message: "폼 파싱 에러" });
    }

    const imageFile = files.image;
    if (!imageFile) {
      return res
        .status(400)
        .json({ message: "제공된 이미지 파일이 없습니다." });
    }

    try {
      const imageUrl = await uploadImage(imageFile, "boodleproject", "images"); // 'boodleproject'는 실제 S3 버킷 이름으로 교체하세요.

      const client = await connectDB();
      const db = client.db("boodle");
      const { brand, prd_name, prd_price, categories, gift_type } = fields;

      const result = await db.collection("product").insertOne({
        imageUrl,
        brand,
        prd_name,
        prd_price,
        categories,
        gift_type,
      });

      res
        .status(200)
        .json({ message: "상품 등록이 성공적으로 완료되었습니다.", result });
    } catch (error) {
      console.error("상품 등록에 실패했습니다.:", error);
      res.status(500).json({ message: "상품 등록에 실패했습니다." });
    } finally {
      if (client) {
        await client.close();
      }
    }
  });
}
