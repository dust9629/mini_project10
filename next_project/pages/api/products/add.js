import { connectDB } from "@/util/database";
const formidable = require("formidable").default;
const cloudinary = require("cloudinary").v2;

// Cloudinary 설정 (환경 변수 CLOUDINARY_URL은 자동으로 적용됩니다.)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let client; // 클라이언트 변수를 외부에 정의
  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error processing form:", err);
        return res.status(500).json({ message: "Form processing error" });
      }
      console.log("Files object structure:", files);
      const { brand, prd_name, prd_price, categories, gift_type } = fields;
      const imageFile = files.image;

      try {
        // MongoDB 클라이언트 연결
        client = await connectDB();
        const db = client.db("boodle");

        // Cloudinary로 이미지 업로드
        const imageResult = await cloudinary.uploader.upload(
          imageFile.filepath,
          {
            upload_preset: "boodle",
          }
        );
        const imageUrl = imageResult.secure_url;

        // 상품 정보와 이미지 URL을 DB에 저장
        const result = await db.collection("product").insertOne({
          imageUrl,
          brand,
          prd_name,
          prd_price,
          categories,
          gift_type,
        });

        res.status(200).json({ message: "Product added successfully", result });
      } catch (error) {
        console.error("Failed to add product", error);
        res.status(500).json({ message: "Failed to add product" });
      } finally {
        if (client) await client.close(); // 클라이언트가 정의된 경우에만 닫기
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
