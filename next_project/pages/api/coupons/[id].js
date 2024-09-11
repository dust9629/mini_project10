import { connectDB } from "@/util/database"; // 경로에 주의하세요, 이 경로가 맞는지 확인이 필요합니다.
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query; // URL에서 쿠폰 ID를 가져옵니다.

  switch (req.method) {
    case "GET":
      // 쿠폰 정보 조회
      try {
        const { db } = await connectDB();
        const coupon = await db
          .collection("coupons")
          .findOne({ _id: new ObjectId(id) });
        if (!coupon) {
          return res
            .status(404)
            .json({ success: false, message: "쿠폰을 찾을 수 없습니다." });
        }
        res.status(200).json({ success: true, data: coupon });
      } catch (error) {
        res
          .status(500)
          .json({
            success: false,
            message: "서버 오류 발생",
            error: error.message,
          });
      }
      break;

    case "DELETE":
      // 쿠폰 삭제
      try {
        const { db } = await connectDB();
        const result = await db
          .collection("coupons")
          .deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({
              success: false,
              message: "삭제할 쿠폰을 찾을 수 없습니다.",
            });
        }
        res
          .status(200)
          .json({
            success: true,
            message: "쿠폰이 성공적으로 삭제되었습니다.",
          });
      } catch (error) {
        res
          .status(500)
          .json({
            success: false,
            message: "서버 오류 발생",
            error: error.message,
          });
      }
      break;

    default:
      res
        .status(405)
        .json({ success: false, message: "허용되지 않은 메서드입니다." });
  }
}
