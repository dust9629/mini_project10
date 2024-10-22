import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import jwtDecode from "jwt-decode";

export default function Ordered() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/member");
      return;
    }
    // 토큰에서 userId 추출
    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      Router.push("/member");
      return;
    }

    const fetchUserAndOrders = async () => {
      setLoading(true);
      if (!userId) {
        Router.push("/member"); // userId가 없다면 로그인 페이지로 리다이렉션
        return;
      }

      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setUser(response.data);
          await fetchOrders(userId, token);
        } else {
          Router.push("/member");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Router.push("/member");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, []);

  const fetchOrders = async (userId, token) => {
    try {
      const ordersResponse = await axios.get(
        `/api/orders/user?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (!user) {
    return <p>유저 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <main className={styles.mypage}>
      <Link className={styles.back} href="/mypage">
        <Image
          src="/images/icon_arrow_back.png"
          alt="뒤로가기 버튼"
          width={200}
          height={50}
        />
      </Link>
      <section className={styles.mypageTop}>
        <h3 className={styles.mypageTit}>마이페이지</h3>
        <div className={styles.mypageUsers}>
          <div className={styles.profile}>
            <Image
              src="/images/profile.jpg"
              alt="사용자 프로필 이미지"
              width={300}
              height={300}
            />
          </div>
          <ul>
            <li className={styles.badge}>
              <span className={user.role === "admin" ? styles.active : ""}>
                관리자
              </span>
              <span className={user.role === "normember" ? styles.active : ""}>
                일반회원
              </span>
            </li>
            <li className={styles.userName}>
              <strong>{user?.name || "Guest"}</strong>님 안녕하세요.
            </li>
            <li className={styles.email}>
              {user?.email || "이메일 정보 없음"}
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.orderedBtm}>
        <h3 className={styles.mypageTit}>주문 배송 조회</h3>
        <ul>
          <li className={styles.stepOne}>
            <strong className={styles.orderedAct}>1</strong>
            <span className={styles.orderedAct}>주문접수</span>
          </li>
          <li className={styles.stepTwo}>
            <strong>0</strong>
            <span>상품준비중</span>
          </li>
          <li className={styles.stepThree}>
            <strong>0</strong>
            <span>배송중</span>
          </li>
          <li className={styles.stepFour}>
            <strong>0</strong>
            <span>배송완료</span>
          </li>
        </ul>
        {orders.map((order, index) => (
          <div className={styles.orderedInfo} key={index}>
            <h5>
              주문번호 :{" "}
              <span className={styles.orderedId}>{order.orderNumber}</span>
            </h5>
            <p>
              상품명 :{" "}
              <span className={styles.orderedPrd}>
                {order.items[0].name} 외 {order.items.length - 1}개
              </span>
            </p>
            <div className={styles.orderedSum}>
              <div>
                수량 :{" "}
                <span className={styles.orderedCount}>
                  {order.items.length}
                </span>
              </div>
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
              <strong className={styles.orderedPrice}>
                {order.totalPrice.toLocaleString()}
              </strong>
              원
            </div>
          </div>
        ))}
      </section>
      <section className={styles.orderedBtm}>
        <h3 className={styles.mypageTit}>취소/교환/반품 내역</h3>
        <p>취소/교환/반품 내역 기능은 준비중입니다.</p>
      </section>
    </main>
  );
}
