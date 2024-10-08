import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function Mypage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/member");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Router.push("/member");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
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
        <div className={styles.orderedInfo}>
          <h5>
            주문번호 : <span>2024100801</span>
          </h5>
          <p>
            상품명 : <span>화분 및 어쩌구..</span>
          </p>
          <div className={styles.orderedSum}>
            <span>수량 : 1</span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <strong>30,000</strong>원
          </div>
        </div>
      </section>
      <section className={styles.orderedBtm}>
        <h3 className={styles.mypageTit}>취소/교환/반품 내역</h3>
        <p>취소/교환/반품 내역 기능은 준비중입니다.</p>
      </section>
    </main>
  );
}
