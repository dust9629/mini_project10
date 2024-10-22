import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./../../index.module.css";

export default function Complete() {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(10); // 10초부터 시작
  const [orderInfo, setOrderInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 장바구니 비우기
    localStorage.removeItem("cart");
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);

    // 주문 정보
    const savedOrderInfo = JSON.parse(localStorage.getItem("orderInfo"));
    if (savedOrderInfo) {
      const { orderNumber, items, totalPrice } = savedOrderInfo;
      const firstItem = items[0];
      const itemName =
        items.length > 1
          ? `${firstItem.name} 외 ${items.length - 1}개`
          : firstItem.name;
      setOrderInfo({
        orderNumber,
        itemName,
        itemCount: items.length,
        totalPrice,
      });
    }

    setIsLoading(true);
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsLoading(false);
      router.push("/"); // 메인 페이지로 리다이렉션
    }, 10000); // 10초 후에 실행

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className={styles.order}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>

      <section className={styles.orderList}>
        <h3 className={styles.cartTit}>
          {isLoading
            ? `주문 처리 중... (${seconds})`
            : "상품주문이 완료되었습니다!"}
        </h3>

        <div className={styles.completeWrap}>
          {isLoading ? <p>잠시 후 메인으로 이동합니다.</p> : <p>감사합니다.</p>}
        </div>

        {orderInfo && (
          <div className={styles.orderedInfo}>
            <h5>
              주문번호 :{" "}
              <span className={styles.orderedId}>{orderInfo.orderNumber}</span>
            </h5>
            <p>
              상품명 :{" "}
              <span className={styles.orderedPrd}>{orderInfo.itemName}</span>
            </p>
            <div className={styles.orderedSum}>
              <div>
                수량 :{" "}
                <span className={styles.orderedCount}>
                  {orderInfo.itemCount}
                </span>
              </div>
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
              <strong className={styles.orderedPrice}>
                {orderInfo.totalPrice.toLocaleString()}
              </strong>
              원
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
