import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("메소드가 허용되지 않았습니다.");
  }

  const { email, password, kakaoToken } = req.body;

  // 카카오 로그인 처리
  if (kakaoToken) {
    try {
      const userInfoResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const { email, profile } = userInfoResponse.data.kakao_account;
      const { db } = await connectDB();

      let user = await db.collection("users").findOne({ email });
      if (!user) {
        user = await db.collection("users").insertOne({
          email,
          name: profile.nickname,
          role: "normember",
          provider: "kakao",
        });
        user = { _id: result.insertedId, ...result.ops[0] };
      }

      const token = jwt.sign(
        { userId: user._id.toString(), role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token: token,
        userId: user._id.toString(),
        userRole: user.role,
        // userInfo: {
        //   name: user.name,
        //   email: user.email,
        //   address: user.address,
        //   phoneNumber: user.phoneNumber,
        //   zoneCode: user.zoneCode,
        // },
      });
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    // 일반 로그인 처리
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
      return res.status(200).json({
        token,
        userId: user._id.toString(),
        userRole: user.role,
        userInfo: {
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          zoneCode: user.zoneCode,
        },
      });
    } catch (error) {
      console.error("로그인 오류:", error);
      return res
        .status(500)
        .json({ message: "서버 내부 오류", error: error.message });
    }
  }
};
