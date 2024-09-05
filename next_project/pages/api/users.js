import { connectDB } from "../../util/database";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "허용되지 않은 메소드입니다." });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
    }

    // JWT 토큰 검증
    // console.log("JWT_SECRET used for verification:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // 데이터베이스에서 사용자 정보 조회
    const { client, db } = await connectDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    client.close();
    // 검증된 사용자 정보 전송
    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error("서버 처리 중 오류 발생:", error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    } else if (error.name === "MongoNetworkError") {
      res.status(503).json({ message: "데이터베이스 연결 실패" });
    } else {
      res.status(500).json({ message: "서버 내부 오류" });
    }
  }
};
