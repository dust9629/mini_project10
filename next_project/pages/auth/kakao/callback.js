import { useEffect } from "react";
import { useRouter } from "next/router";

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { token, role } = router.query;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // 토큰을 사용해 필요한 상태 설정 후 메인 페이지나 대시보드로 리다이렉트
      router.push("/dashboard");
    } else {
      // 토큰이 없거나 문제가 있을 경우 로그인 페이지로 리다이렉트
      router.push("/login");
    }
  }, [router]);

  return <div>Loading... Please wait.</div>;
};

export default KakaoCallback;
