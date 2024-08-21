import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import { useEffect, useState } from "react";
import ReviewSection from "../../../components/review";

export default function Detail() {
  const [posts, setPosts] = useState([]);

  return (
    <main className={styles.productDetail}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.prd}>
        <div className={styles.prdInfo}>
          <div className={styles.prdImg}>
            <Image src="/images/brand0_0.jpg" width={700} height={700} />
          </div>
          <div className={styles.prdTxt}>
            <span className={styles.prdBrand}>베르몬드</span>
            <div className={styles.prdTit}>
              <h3>다이빙 머그컵</h3>
              <p className={styles.likeBtn}>
                <Image
                  src="/images/icon_like_e.png"
                  className={styles.likeE}
                  width={35}
                  height={35}
                />
                <Image
                  src="/images/icon_like_f.png"
                  className={styles.likeF}
                  width={35}
                  height={35}
                />
              </p>
            </div>
            <p className={styles.prdPrice}>
              <strong>23,000</strong>원
            </p>
            <ul className={styles.prdDesc}>
              <li>
                배송정보 : <span>무료배송</span>
              </li>
              <li>
                배송정보 : <span>무료배송</span>
              </li>
              <li>
                배송정보 : <span>무료배송</span>
              </li>
              <li>
                배송정보 : <span>무료배송</span>
              </li>
            </ul>
          </div>
          <div className={styles.prdBtn}>
            <p>
              <button className={styles.cart}>장바구니</button>
              <button className={styles.buy}>구매하기</button>
            </p>
            <button className={styles.gift}>선물하기</button>
          </div>
        </div>
      </section>
      <section className={styles.prd}>
        <h3 className={styles.listTit}>상세 정보</h3>
        <div className={styles.prdDetails}>
          <Image src="/images/brand0_0.jpg" width={700} height={700} />
        </div>
      </section>
      <ReviewSection />
    </main>
  );
}
