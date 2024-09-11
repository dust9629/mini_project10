import { connectDB } from "../../../util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { couponName, discountRate, validityPeriod } = req.body;

    try {
      const { db } = await connectDB();
      const response = await db.collection("coupons").insertOne({
        couponName,
        discountRate,
        validityPeriod,
      });
      // response.ops[0] 대신 response.insertedId 사용
      res.status(200).json({
        success: true,
        message: "쿠폰이 성공적으로 등록되었습니다.",
        data: {
          couponName,
          discountRate,
          validityPeriod,
          _id: response.insertedId,
        },
      });
    } catch (error) {
      console.error("Error occurred: ", error);
      res.status(500).json({
        success: false,
        message: "서버 오류 발생",
        error: error.message,
      });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: "허용되지 않은 메서드입니다." });
  }
}
