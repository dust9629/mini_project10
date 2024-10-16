import Link from "next/link";
import styles from "./../../index.module.css";

export default function Complete() {
  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>상품주문이 완료되었습니다!</h3>
          </div>
          <div className={styles.linkGroup}>
            <Link href="/">메인으로 이동</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
