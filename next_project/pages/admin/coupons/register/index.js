import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./../../index.module.css";

export default function AdminCoupons() {
  const [couponName, setCouponName] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("");

  const resetForm = () => {
    setCouponName("");
    setDiscountRate("");
    setValidityPeriod("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const couponData = {
      couponName,
      discountRate,
      validityPeriod,
    };

    const response = await fetch("/api/coupons/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(couponData),
    });

    const data = await response.json();
    if (data.success) {
      alert("쿠폰이 성공적으로 등록되었습니다.");
      resetForm(); // 폼 초기화
    } else {
      alert("쿠폰 등록 실패: " + data.message);
    }
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
                placeholder="쿠폰 이름 입력"
                onChange={(e) => setCouponName(e.target.value)}
              />
            </label>
            <label>
              <span>할인율</span>
              <input
                type="text"
                name="coupon_percent"
                value={discountRate}
                placeholder="할인율 입력 (ex : 20%)"
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </label>
            <label>
              <span>기간</span>
              <input
                type="text"
                name="coupon_period"
                value={validityPeriod}
                placeholder="유효 기간 입력 (ex: 2099.01.01 ~ 2099.12.31)"
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
