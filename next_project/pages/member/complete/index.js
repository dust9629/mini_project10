import Link from "next/link";
import styles from "./../index.module.css"; // CSS 모듈 임포트

export default function Complete() {
  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>회원가입이 완료되었습니다!</h3>
          </div>
          <div className={styles.linkGroup}>
            <Link href="/member">로그인 페이지로 이동</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
