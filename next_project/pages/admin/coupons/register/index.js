import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./../../index.module.css";

export default function AdminCoupons() {
  // 상태 초기화
  const [couponName, setCouponName] = useState("첫 구매 할인쿠폰");
  const [discountRate, setDiscountRate] = useState("30%");
  const [validityPeriod, setValidityPeriod] = useState(
    "2024.01.01 ~ 2024.10.10"
  );

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 API 호출을 수행하거나 다른 처리를 할 수 있습니다.
    alert(
      `쿠폰 이름: ${couponName}, 할인율: ${discountRate}, 기간: ${validityPeriod}`
    );
  };
  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>쿠폰관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link href="/admin/coupons">쿠폰 전체조회</Link>
          </li>
          <li>
            <Link className={styles.active} href="/admin/coupons/register">
              쿠폰 등록
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <span>쿠폰 등록하기</span>
        </h3>
        <div className={styles.register}>
          <form onSubmit={handleSubmit}>
            <label>
              <span>쿠폰 이름</span>
              <input
                type="text"
                name="coupon"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
              />
            </label>
            <label>
              <span>할인율</span>
              <input
                type="text"
                name="coupon_percent"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </label>
            <label>
              <span>기간</span>
              <input
                type="text"
                name="coupon_period"
                value={validityPeriod}
                onChange={(e) => setValidityPeriod(e.target.value)}
              />
            </label>
            <button className={styles.registerBtn} type="submit">
              쿠폰 등록하기
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
