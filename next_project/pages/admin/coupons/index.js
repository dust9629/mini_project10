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
        <h3 className={styles.adminTit}>쿠폰관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link className={styles.active} href="/admin/coupons">
              쿠폰 전체조회
            </Link>
          </li>
          <li>
            <Link href="/admin/coupons/register">쿠폰 등록</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <span>쿠폰 전체조회</span>
        </h3>
        <ul className={styles.adminList}>
          <li className={styles.coupon}>
            <div className={styles.couponTxt}>
              <h5 className={styles.couponTit}>첫 구매 쿠폰</h5>
              <p className={styles.couponPer}>
                <strong>30</strong>%
              </p>
              <span className={styles.couponDue}>2024.01.01 ~ 2024.10.10</span>
            </div>
            <button className={styles.del}>
              <Image src="/images/icon_close.png" width={50} height={50} />
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
}
