import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function adminBrands() {
  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>브랜드 소개글 관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link className={styles.active} href="/admin/brands">
              브랜드 관리
            </Link>
          </li>
          <li>
            <Link href="/admin/brands/register">브랜드 등록</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <p>등록된 소개글</p>
          <div>
            <span>0</span> 개
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
