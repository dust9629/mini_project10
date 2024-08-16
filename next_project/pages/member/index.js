import Link from "next/link";
import styles from "./index.module.css"; // CSS 모듈 임포트

export default function Detail() {
  return (
    <main>
      <section className="section01 member">
        {" "}
        {/* // CSS 모듈 클래스 사용 */}
        <div className={styles.memInfo}>
          <div className={styles.prdTxt}>
            <h3>로그인 페이지</h3>
            <form>
              <label htmlFor="login_id">아이디:</label>
              <input
                type="text"
                id="login_id"
                name="login_id"
                placeholder="아이디를 입력하세요"
                required
                className={styles.inputField} // CSS 모듈 클래스 사용
              />

              <label htmlFor="login_password">비밀번호:</label>
              <input
                type="password"
                id="login_password"
                name="login_password"
                placeholder="비밀번호를 입력하세요"
                required
                className={styles.inputField} // CSS 모듈 클래스 사용
              />

              <div className={styles.checkboxGroup}>
                {" "}
                // CSS 모듈 클래스 사용
                <input type="checkbox" id="remember_id" name="remember_id" />
                <label htmlFor="remember_id">아이디 저장하기</label>
              </div>

              <button type="submit" className={styles.loginButton}>
                {" "}
                // CSS 모듈 클래스 사용 로그인
              </button>

              <div className={styles.linkGroup}>
                {" "}
                // CSS 모듈 클래스 사용
                <Link href="/">회원가입</Link>
                <Link href="/">아이디 찾기</Link>
                <Link href="/">비밀번호 찾기</Link>
                <Link href="/">비회원 주문 조회</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
