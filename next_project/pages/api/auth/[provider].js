// import jwt from "jsonwebtoken";
import axios from "axios";
import { connectDB } from "../../../util/database";
import express from "express";
import session from "express-session";
import ConnectMongo from "connect-mongo";

const mongoStore = ConnectMongo.create({
  clientPromise: connectDB().then(({ client }) => client),
  stringify: false,
});

export default function authHandler(req, res) {
  const app = express();

  app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: false,
      store: mongoStore, // 수정된 MongoStore 인스턴스 사용
      cookie: { maxAge: 1800000 }, // 30분
    })
  );

  // 카카오 로그인 라우트
  app.post("/api/auth/kakao", async (req, res) => {
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
          kakaoId: userInfoResponse.data.id,
        });
      }

      // 세션에 사용자 정보 저장
      req.session.user = {
        id: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email,
      };

      res.redirect("/"); // 성공적인 로그인 후 리디렉션
    } catch (error) {
      console.error("Kakao login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return app(req, res);
}
