import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

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
      <Link className={styles.back} href="/">
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
      <section className={styles.mypageBtm}>
        <h3 className={styles.mypageTit}></h3>
        <ul>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m01.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>정보변경</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m02.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>주문확인</p>
            </Link>
          </li>
          <li>
            <Link href="/like">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m03.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>관심상품</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m04.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>장바구니</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m05.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>할인코드</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image
                  alt={"icon"}
                  src="/images/icon_m06.png"
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.mypageMenu}>할인쿠폰</p>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
