import axios from "axios";
import { connectDB } from "../../util/database";

export default async (req, res) => {
  if (req.query.provider === "kakao") {
    console.log("KAKAO_REST_API_KEY:", process.env.KAKAO_REST_API_KEY);
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

      // 사용자 정보 요청
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
      const { client, db } = await connectDB();

      // 이메일이 없는 경우 예외 처리
      if (!email) {
        throw new Error("이메일 없음 - 카카오 계정에서 이메일 제공 동의 필요");
      }

      // MongoDB에서 사용자 조회
      let user = await db.collection("users").findOne({ email });

      // MongoDB에 사용자가 없으면 새로 저장
      if (!user) {
        user = await db.collection("users").insertOne({
          email,
          name: profile.nickname, // 프로필에서 이름 가져오기
          role: "normember", // 기본 권한 설정
          provider: "kakao", // 로그인 제공자 표시
          kakaoId: userInfoResponse.data.id, // 카카오 사용자 ID 저장
        });
      }

      // 성공적 로그인 처리
      res.redirect("/");
    } catch (error) {
      console.error("Kakao login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
