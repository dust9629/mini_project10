import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function adminCoupons() {
  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>관리자 페이지</h3>
        <ul className={styles.admintab}>
          <li>회원조회</li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}></h3>
      </section>
    </main>
  );
}
