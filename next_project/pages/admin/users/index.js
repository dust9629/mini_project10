import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function adminUers() {
  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>회원관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link className={styles.active} href="/admin/users">
              일반회원
            </Link>
          </li>
          <li>
            <Link href="/admin/users">관리자</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <p>회원 전체조회</p>
          <div>
            <span>0</span> 명
          </div>
        </h3>
        <ul className={styles.adminList}>
          <li className={styles.user}>
            <div></div>
          </li>
        </ul>
      </section>
    </main>
  );
}
