import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export default function Mypage() {
  return (
    <main className={styles.mypage}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
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
              <strong>김은지</strong>님 안녕하세요.
            </li>
            <li className={styles.email}>dust1234@gmail.com</li>
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
