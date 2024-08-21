import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
// import styles from "./../../member";
import { useEffect, useState } from "react";

let orderList = [
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

export default function order() {
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);

  const handleAddressSearch = () => {
    // 다음 우편번호 서비스를 호출하는 함수
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

  return (
    <main className={styles.order}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.orderTop}>
        <div>
          <h3 className={styles.orderTit}>상품주문</h3>
        </div>
      </section>

      <section className={styles.orderList}>
        <div className={styles.orderWrap}>
          <ul className="order-wrap">
            {orderList.map((item, i) => (
              <li className={styles.order} key={i}>
                <Link className={styles.orderConts} href="/list/detail">
                  <div className={styles.orderImg}>
                    <Image
                      src={`/images/item_b${i}.jpg`}
                      alt={item.name}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className={styles.orderPrd}>
                    <span className={styles.orderBrand}>{item.brand}</span>
                    <h3 className={styles.orderPrdName}>{item.name}</h3>
                    <p className={styles.orderPrice}>
                      수량 : <span className={styles.orderCount}>2</span>
                      &nbsp;&nbsp;/&nbsp;&nbsp;
                      <strong>{item.price}</strong>원
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.orderTxt}>
          <h4>결제예정 금액</h4>
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

        <div className={styles.payWay}>
          <h3 className={styles.orderTit}>결제수단</h3>
          <ul>
            <li>{/* <Image src="/images/" /> */}</li>
          </ul>
        </div>

        <div className={styles.orderInfo}>
          <h3 className={styles.orderTit}>주문자 정보</h3>

          <form>
            <div>
              <label htmlFor="join_email">이메일*</label>
              <input
                type="email"
                id="join_email"
                name="join_email"
                placeholder="이메일 주소를 입력하세요"
                required
                className={styles.inputField}
              />
            </div>
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
                  readOnly
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
                readOnly
                required
                className={styles.inputField}
              />
              <input
                type="text"
                id="join_address02"
                name="join_address02"
                placeholder="상세 주소 입력"
                value=""
                readOnly
                required
                className={styles.inputField}
              />
            </div>
          </form>
        </div>

        <div className={styles.orderBtn}>
          <button className={styles.select}>선택상품주문</button>
          <button className={styles.total}>전체상품주문</button>
        </div>
      </section>
    </main>
  );
}
