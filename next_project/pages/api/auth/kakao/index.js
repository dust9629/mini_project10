// next_project/pages/api/auth/kakao.js
import axios from "axios";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../util/database";

export default async function kakaoLogin(req, res) {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        code,
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

    const { email, profile } = userInfoResponse.data.kakao_account;
    const { db } = await connectDB();

    let user = await db.collection("users").findOne({ email });
    if (!user) {
      user = await db.collection("users").insertOne({
        email,
        name: profile.nickname,
        role: "member",
        provider: "kakao",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirect to frontend with token in query to store in localStorage
    res.redirect(`/?token=${token}&role=${user.role}`);
  } catch (error) {
    console.error("Kakao login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
