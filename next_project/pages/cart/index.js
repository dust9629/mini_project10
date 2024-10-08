import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

let cartList = [
  {
    name: "감성 인테리어 파키라+페블 화분+흙없이 실내에서 키우는 식물 축하 선물 (블랙&화이트)",
    brand: "본투비그린",
    price: "23,900",
  },
  {
    name: "[화분 받침] Art Pot 받침",
    brand: "슈퍼마켙 플라워",
    price: "3,000",
  },
  {
    name: "미니 히노키 pearl",
    brand: "큐이디",
    price: "50,000",
  },
  {
    name: "해송소나무 테라스톤세트 미니분재",
    brand: "펫플랜트",
    price: "52,800",
  },
];

export default function Cart() {
  return (
    <main className={styles.cart}>
      <Link className={styles.back} href="/mypage">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.cartList}>
        <h3 className={styles.cartTit}>장바구니</h3>
        <div className={styles.cartWrap}>
          <ul>
            {cartList.map((item, i) => (
              <li className={styles.cart} key={i}>
                <Link className={styles.cartConts} href="/list/detail">
                  <div className={styles.cartImg}>
                    <Image
                      src={`/images/item_b${i}.jpg`}
                      alt={item.name}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className={styles.cartPrd}>
                    <span className={styles.cartBrand}>{item.brand}</span>
                    <h3 className={styles.cartPrdName}>{item.name}</h3>
                    <p className={styles.cartPrice}>
                      {/* 수량 : <span className={styles.cartCount}>2</span>
                      &nbsp;&nbsp;/&nbsp;&nbsp; */}
                      <strong>{item.price}</strong>원
                    </p>
                  </div>
                </Link>
                <button className={styles.del}>
                  <Image src="/images/icon_close.png" width={50} height={50} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.payAll}>
          <h3 className={styles.orderTit}>결제예정 금액</h3>
          <ul>
            <li>
              <h6>총 상품금액</h6>
              <p>
                <strong>30,000</strong>원
              </p>
            </li>
            <li>
              <h6>총 할인금액</h6>
              <p>
                <strong>0</strong>원
              </p>
            </li>
            <li>
              <h6>총 배송비</h6>
              <p>
                <strong>0</strong>원
              </p>
            </li>
          </ul>
          <div className={styles.totalPrice}>
            <h6>총 결제 금액</h6>
            <p>
              <strong>30,000</strong>원
            </p>
          </div>
        </div>
        <div className={styles.cartBtn}>
          <button className={styles.select}>선택상품주문</button>
          <button className={styles.total}>전체상품주문</button>
        </div>
      </section>
    </main>
  );
}
