import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        router.push("/");
      }
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>로그인 해주세요</h3>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="login_id">이메일</label>
                <input
                  type="text"
                  id="login_id"
                  name="login_id"
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="login_password">비밀번호</label>
                <input
                  type="password"
                  id="login_password"
                  name="login_password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="remember_id" name="remember_id" />
                <label htmlFor="remember_id">아이디 저장하기</label>
              </div>

              <button type="submit" className={styles.loginButton}>
                로그인
              </button>
              <button
                type="button"
                onClick={handleKakaoLogin}
                className={styles.kakaoLoginButton}
              >
                카카오 로그인
              </button>
              <Link href="/member/join">회원가입</Link>

              <div className={styles.linkGroup}>
                <Link href="/member/find_id">아이디 찾기</Link>|
                <Link href="/member/find_pw">비밀번호 찾기</Link>|
                <Link href="/member/nonmember">비회원 주문 조회</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
