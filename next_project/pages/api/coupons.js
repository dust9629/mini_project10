// next_project/pages/api/coupons.js
import { connectDB } from "@/util/database"; // 데이터베이스 연결 모듈
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectDB();

  switch (req.method) {
    case "GET":
      // 전체 쿠폰 목록을 불러옵니다.
      try {
        const coupons = await db.collection("coupons").find({}).toArray();
        res.status(200).json({ success: true, data: coupons });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "서버 오류 발생",
          error: error.message,
        });
      }
      break;

    case "POST":
      // 새로운 쿠폰을 추가합니다.
      try {
        const { couponName, discountRate, validityPeriod } = req.body;
        const newCoupon = {
          couponName,
          discountRate,
          validityPeriod,
        };
        const response = await db.collection("coupons").insertOne(newCoupon);
        res.status(201).json({
          success: true,
          message: "쿠폰이 성공적으로 등록되었습니다.",
          data: {
            _id: response.insertedId,
            ...newCoupon,
          },
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "쿠폰 등록 실패",
          error: error.message,
        });
      }
      break;

    default:
      // 허용되지 않은 메서드에 대한 처리
      res
        .status(405)
        .json({ success: false, message: "허용되지 않은 메서드입니다." });
  }
}
