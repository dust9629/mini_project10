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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { db } = await connectDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
