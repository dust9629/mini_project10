import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import styles from "./index.module.css";
import axios from "axios";

export default function Admin({ user, error }) {
  useEffect(() => {
    if (error || !user.role === "admin") {
      alert(error || "접근 권한이 없습니다.");
      Router.push("/login");
    }
  }, [error, user]);

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

// 서버 사이드에서 사용자의 'admin' 권한을 검사
export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return {
      props: {
        user: {},
        error: "로그인이 필요합니다.",
      },
    };
  }
  try {
    const response = await axios.get("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.role !== "admin") {
      return {
        props: {
          user: {},
          error: "관리자만 접속이 가능합니다.",
        },
      };
    }
    return { props: { user: response.data } };
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return {
      props: {
        user: {},
        error: "관리자 정보를 불러오는데 실패했습니다.",
      },
    };
  }
}
