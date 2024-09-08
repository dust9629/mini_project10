import axios from "axios";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../util/database";

export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        code,
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const { email, properties } = userInfoResponse.data.kakao_account;
    const { nickname: name } = properties;
    const { db } = await connectDB();
    let user = await db.collection("users").findOne({ email });

    if (!user) {
      user = await db.collection("users").insertOne({
        email,
        name,
        role: "normember",
        provider: "kakao",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.redirect(`/?token=${token}&role=${user.role}`);
  } catch (error) {
    console.error("카카오 로그인 에러:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
