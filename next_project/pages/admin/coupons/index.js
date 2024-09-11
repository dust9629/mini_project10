import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/coupons");
        setCoupons(response.data.data); // API 응답에서 쿠폰 데이터 설정
      } catch (error) {
        console.error("쿠폰을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchCoupons();
  }, []);

  const deleteCoupon = async (couponId) => {
    const confirmDelete = window.confirm("해당 쿠폰을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/coupons/${couponId}`);
        if (response.status === 200) {
          alert("쿠폰이 성공적으로 삭제되었습니다.");
          setCoupons(coupons.filter((coupon) => coupon._id !== couponId)); // 상태에서 삭제
        }
      } catch (error) {
        console.error("쿠폰 삭제에 실패했습니다.", error);
        alert("쿠폰 삭제에 실패했습니다.");
      }
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
          {coupons.map((coupon) => (
            <li key={coupon._id} className={styles.coupon}>
              <div className={styles.couponTxt}>
                <h5 className={styles.couponTit}>{coupon.couponName}</h5>
                <p className={styles.couponPer}>
                  <strong>{coupon.discountRate}</strong>%
                </p>
                <span className={styles.couponDue}>
                  {coupon.validityPeriod}
                </span>
              </div>
              <button
                className={styles.del}
                onClick={() => deleteCoupon(coupon._id)}
              >
                <Image src="/images/icon_close.png" width={50} height={50} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
