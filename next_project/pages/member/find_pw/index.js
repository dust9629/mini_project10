import Link from "next/link";
import styles from "./../index.module.css";

export default function findPw() {
  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>비밀번호 찾기</h3>
            <form>
              <div>
                <label htmlFor="find_pw_names">이름</label>
                <input
                  type="text"
                  id="find_pw_names"
                  name="find_pw_names"
                  placeholder="이름을 입력하세요"
                  required
                  className={styles.inputField}
                />
              </div>
              <div>
                <label htmlFor="find_pw_email">이메일</label>
                <input
                  type="text"
                  id="find_pw_email"
                  name="find_pw_email"
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className={styles.inputField}
                />
              </div>

              <span>* 간편 가입 계정은 비밀번호 찾기가 불가합니다</span>

              <button type="submit" className={styles.findPwButton}>
                비밀번호 찾기
              </button>

              <Link href="/member">로그인</Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
