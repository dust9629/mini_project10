import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export default function Salecode() {
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("");

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

  const handleRegister = () => {
    if (!code || code !== "VALID_CODE") {
      alert("등록되지 않은 코드입니다.");
    } else {
      alert("코드가 성공적으로 등록되었습니다.");
    }
  };

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
        <h3 className={styles.mypageTit}>할인코드 등록</h3>
        <div className={styles.salesInput}>
          <input
            type="text"
            className={styles.input}
            placeholder="할인코드를 입력하세요"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className={styles.button} onClick={handleRegister}>
            등록
          </button>
        </div>
        <p className={styles.codeEmpty}>등록된 할인코드가 없습니다.</p>
      </section>
    </main>
  );
}
