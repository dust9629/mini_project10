import { useEffect } from "react";
import { useRouter } from "next/router";

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { token, role } = router.query;

    if (token) {
      // 토큰을 사용해 토큰, 유저타입 가져온 후 메인 페이지나 대시보드로 리다이렉트
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      router.push("/");
    } else {
      // 토큰이 없거나 문제가 있을 경우 로그인 페이지로 리다이렉트
      router.push("/member");
    }
  }, [router]);

  return <div>로딩중...잠시만 기다려주세요.</div>;
};

export default KakaoCallback;
