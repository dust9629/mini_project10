import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("메소드가 허용되지 않았습니다.");
  }

  const { email, password } = req.body;
  try {
    const { db } = await connectDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "잘못된 검증입니다." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userRole: user.role });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ message: "서버 내부 오류", error: error.message });
  }
};
