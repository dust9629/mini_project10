import axios from "axios";
import { serialize } from "cookie";

export default async (req, res) => {
  console.log("Reached the callback endpoint");
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Token response:", tokenResponse.data);
    const { access_token } = tokenResponse.data;

    res.redirect("/");
  } catch (error) {
    console.error("Kakao login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
