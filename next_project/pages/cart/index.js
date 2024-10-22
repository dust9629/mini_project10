import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    loadCart();
  }, []);

  const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart);
    alert("상품이 장바구니에서 제거되었습니다.");

    // Custom 이벤트 발생시키기
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  // useRouter 사용하여 주문 페이지로 이동
  const router = useRouter();
  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
    } else {
      router.push("/cart/order");
    }
  };

  // 가격 합산 함수
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
      return total + price;
    }, 0);
  };

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toLocaleString(); // 숫자를 원 단위로 포맷팅
  };

  const totalPrice = calculateTotalPrice();

  return (
    <main className={styles.cart}>
      <Link className={styles.back} href="/">
        <Image
          src="/images/icon_arrow_back.png"
          alt="back"
          width={200}
          height={50}
        />
      </Link>
      <section className={styles.cartList}>
        <h3 className={styles.cartTit}>장바구니</h3>
        <div className={styles.cartWrap}>
          <ul>
            {cartItems.length > 0 ? (
              cartItems.map((item, i) => (
                <li className={styles.cart} key={i}>
                  <Link
                    className={styles.cartConts}
                    href={`/list/detail/${item._id}`}
                  >
                    <div className={styles.cartImg}>
                      <Image
                        src={item.imageUrl || `/images/placeholder.jpg`} // 이미지가 없을 경우 placeholder 이미지 사용
                        alt={item.name}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className={styles.cartPrd}>
                      <span className={styles.cartBrand}>{item.brand}</span>
                      <h3 className={styles.cartPrdName}>{item.name}</h3>
                      <p className={styles.cartPrice}>
                        <strong>{item.price}</strong>원
                      </p>
                    </div>
                  </Link>
                  <button
                    className={styles.del}
                    onClick={() => removeFromCart(i)}
                  >
                    <Image
                      src="/images/icon_close.png"
                      alt="delete"
                      width={50}
                      height={50}
                    />
                  </button>
                </li>
              ))
            ) : (
              <p className={styles.emptyMsg}>장바구니가 비어 있습니다.</p>
            )}
          </ul>
        </div>
        <div className={styles.payAll}>
          <h3 className={styles.orderTit}>결제예정 금액</h3>
          <ul>
            <li>
              <h6>총 상품금액</h6>
              <p>
                <strong>{formatPrice(totalPrice)}</strong>원
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
              <strong>{formatPrice(totalPrice)}</strong>원
            </p>
          </div>
        </div>
        <div className={styles.cartBtn}>
          {/* <button className={styles.select}>선택상품주문</button> */}
          <button className={styles.total} onClick={handleOrder}>
            전체상품주문
          </button>
        </div>
      </section>
    </main>
  );
}
