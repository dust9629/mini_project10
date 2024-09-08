import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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
        if (response.data.role !== "admin") {
          setError("관리자만 접근이 가능합니다.");
          alert("관리자만 접근 가능합니다.");
          Router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Router.push("/member");
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>관리자 페이지</h3>
        <div className={styles.adminUsers}>
          <div className={styles.profile}>
            <Image src="/images/profile.jpg" width={300} height={300} />
          </div>
          <ul>
            <li className={styles.badge}>
              <span>일반회원</span>
              <span className={styles.active}>관리자</span>
              <span>큐레이터</span>
              <span>에디터</span>
              <span>MD</span>
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
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}></h3>
        <ul>
          <li>
            <Link href="/admin/users">
              <p className={styles.adminMenu}>회원관리</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/products">
              <p className={styles.adminMenu}>상품관리</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/coupons">
              <p className={styles.adminMenu}>쿠폰관리</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p className={styles.adminMenu}>이벤트</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/brands">
              <p className={styles.adminMenu}>브랜드</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p className={styles.adminMenu}>큐레이션</p>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
