import Link from "next/link";
import styles from "./index.module.css";

export default function Login() {
  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>로그인 해주세요</h3>
            <form>
              <div>
                <label htmlFor="login_id">이메일</label>
                <input
                  type="text"
                  id="login_id"
                  name="login_id"
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className={styles.inputField}
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
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="remember_id" name="remember_id" />
                <label htmlFor="remember_id">아이디 저장하기</label>
              </div>

              <button type="submit" className={styles.loginButton}>
                로그인
              </button>
              <button type="button" className={styles.kakaoLoginButton}>
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
