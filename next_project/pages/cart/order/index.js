import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Order() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 비회원 로그인 유도
    if (!token) {
      alert("로그인/회원가입 후 이용할 수 있습니다.");
      router.push("/member");
      return;
    }

    // 유저 데이터 로컬 스토리지에서 불러오기
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setAddress(userData.address);
      setPhoneNumber(userData.phoneNumber);
      setZoneCode(userData.zoneCode);
    }

    // 장바구니 데이터 담기
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderItems(cart);
    const total = cart.reduce(
      (acc, item) => acc + parseInt(item.price.replace(/,/g, ""), 10),
      0
    );
    setTotalPrice(total.toLocaleString());
  }, []);

  // 다음 우편번호 서비스를 호출하는 함수
  const handleAddressSearch = () => {
    window.daum.postcode.load(function () {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 사용자가 검색 결과를 선택했을 때 실행되는 함수
          setZoneCode(data.zonecode); // 우편번호 (5자리 새우편번호 사용)
          setAddress(data.address); // 전체 주소
        },
      }).open();
    });
  };

  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderItems(cart);
    const total = cart.reduce(
      (acc, item) => acc + parseInt(item.price.replace(/,/g, ""), 10),
      0
    );
    setTotalPrice(total.toLocaleString());
  }, []);

  // 결제수단 선택
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  // 주문자 정보 불러오기
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setName(userInfo.name);
        setEmail(userInfo.email);
        setAddress(userInfo.address);
        setPhoneNumber(userInfo.phoneNumber);
        setZoneCode(userInfo.zoneCode);
      } catch (error) {
        console.error("Parsing error:", error);
      }
    }
  }, []);

  // 주문서 제출 버튼
  const handlePlaceOrder = async () => {
    if (orderItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    try {
      const orderData = {
        items: orderItems.map((item) => ({ productId: item._id, quantity: 1 })), // 수량은 무조건 1
        userInfo: {
          name,
          email,
          address,
          phoneNumber,
        },
        totalPrice,
      };

      // 주문 API 호출
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "주문 처리에 실패했습니다.");

      localStorage.setItem(
        "orderInfo",
        JSON.stringify({
          orderNumber: responseData.orderNumber, // 서버에서 반환받은 주문번호
          items: orderItems,
          totalPrice: totalPrice,
        })
      );

      alert("주문이 성공적으로 완료되었습니다.");
      localStorage.removeItem("cart"); // 장바구니 비우기
      router.push("/cart/order/complete"); // 주문 완료 페이지로 이동
    } catch (error) {
      alert(`주문 처리 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <main className={styles.order}>
      <Link className={styles.back} href="/cart">
        <Image
          src="/images/icon_arrow_back.png"
          alt="back"
          width={200}
          height={50}
        />
      </Link>

      <section className={styles.orderList}>
        <h3 className={styles.cartTit}>주문 상품 목록</h3>
        <div className={styles.orderWrap}>
          <ul className="order-wrap">
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <li className={styles.order} key={index}>
                  <Link
                    className={styles.orderConts}
                    href={`/list/detail/${item._id}`}
                  >
                    <div className={styles.orderImg}>
                      <Image
                        src={item.imageUrl || `/images/placeholder.jpg`}
                        alt={item.name}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className={styles.orderPrd}>
                      <span className={styles.orderBrand}>{item.brand}</span>
                      <h3 className={styles.orderPrdName}>{item.name}</h3>
                      <p className={styles.orderPrice}>
                        <strong>{item.price}</strong>원
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className={styles.emptyMsg}>주문할 상품이 없습니다.</p>
            )}
          </ul>
        </div>

        <div className={styles.orderInfo}>
          <h3 className={styles.orderTit}>배송지 정보</h3>
          <form>
            <div>
              <label htmlFor="join_name">이름*</label>
              <input
                type="text"
                id="join_name"
                name="join_name"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_email">이메일*</label>
              <input
                type="email"
                id="join_email"
                name="join_email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_phone">휴대폰 번호*</label>
              <input
                type="tel"
                id="join_phone"
                name="join_phone"
                placeholder="휴대폰 번호 입력"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_address">주소*</label>
              <span className={styles.addressWrap}>
                <input
                  type="text"
                  id="join_zonecode"
                  name="join_zonecode"
                  placeholder="우편번호"
                  value={zoneCode}
                  onChange={(e) => setZoneCode(e.target.value)}
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className={styles.addressButton}
                >
                  주소 검색
                </button>
              </span>
              <input
                type="text"
                id="join_address01"
                name="join_address01"
                placeholder="주소 입력"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className={styles.inputField}
              />
              {/* <input
                type="text"
                id="join_address02"
                name="join_address02"
                placeholder="상세 주소 입력"
                value=""
                required
                onChange={(e) => console.log(e.target.value)}
                className={styles.inputField}
              /> */}
            </div>
          </form>
        </div>

        <div className={styles.payWay}>
          <h3 className={styles.orderTit}>결제수단</h3>
          <ul>
            <li>
              <p
                onClick={() => handlePaymentMethodChange("card")}
                className={
                  selectedPaymentMethod === "card" ? styles.payActive : ""
                }
              >
                카드 결제
              </p>
            </li>
            <li>
              <p
                onClick={() => handlePaymentMethodChange("other")}
                className={
                  selectedPaymentMethod === "other" ? styles.payActive : ""
                }
              >
                기타 수단
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.payAll}>
          <h3 className={styles.orderTit}>결제예정 금액</h3>
          <ul>
            <li>
              <h6>총 상품금액</h6>
              <p>
                <strong>{totalPrice}</strong>원
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
            <h6>최종 결제금액</h6>
            <p>
              <strong className={styles.allPrice}>{totalPrice}</strong>원
            </p>
          </div>
        </div>

        <div className={styles.totalBtn}>
          {/* <button className={styles.select}>선택상품주문</button> */}
          <button className={styles.orderAll} onClick={handlePlaceOrder}>
            총 <strong className={styles.allPrice}>{totalPrice}</strong>원
            결제하기
          </button>
        </div>
      </section>
    </main>
  );
}
