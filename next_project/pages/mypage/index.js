import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import axios from "axios";

export default function Mypage() {
  const [user, setUser] = useState(null); // 사용자 정보를 null로 초기화
  const [error, setError] = useState(""); // 에러 메시지를 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      setError("로그인이 필요합니다.");
      setLoading(false); // 로딩 상태 업데이트
      return;
    }

    axios
      .get("http://localhost:3000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "사용자 정보를 불러오는데 실패했습니다."
        );
        Router.push("/login");
        setLoading(false); // 에러 발생 시 로딩 상태 업데이트
      });
  }, []);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중이면 로딩 메시지 표시
  }

  if (error) {
    return <p>{error}</p>; // 오류가 있으면 오류 메시지 표시
  }

  return (
    <main className={styles.mypage}>
      <Link className={styles.back} href="/">
        <Image
          alt="Profile"
          src="/images/icon_arrow_back.png"
          width={200}
          height={50}
        />
      </Link>
      <section className={styles.mypageTop}>
        <h3 className={styles.mypageTit}>마이페이지</h3>
        <div className={styles.mypageUsers}>
          <div className={styles.profile}>
            <Image src="/images/profile.jpg" width={300} height={300} />
          </div>
          <ul>
            <li className={styles.badge}>
              <span className={styles.active}>일반회원</span>
              <span>관리자</span>
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
      <section className={styles.mypageBtm}>
        <h3 className={styles.mypageTit}></h3>
        <ul>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m01.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>정보변경</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m02.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>주문확인</p>
            </Link>
          </li>
          <li>
            <Link href="/like">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m03.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>관심상품</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m04.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>장바구니</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m05.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>할인코드</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.profileImg}>
                <Image src="/images/icon_m06.png" width={300} height={300} />
              </div>
              <p className={styles.mypageMenu}>할인쿠폰</p>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
