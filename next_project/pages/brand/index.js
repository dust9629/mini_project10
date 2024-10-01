import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export default function Brand() {
  return (
    <main className={styles.brandStory}>
      <section className={styles.topBan}>
        <Image
          src="/images/brandBan.jpg"
          alt="브랜드 소개 배너"
          width={650}
          height={250}
        />
      </section>
      {/* <Link className={styles.back} href="/">
        <Image
          src="/images/icon_arrow_back.png"
          width={200}
          height={50}
          alt="뒤로가기"
        />
      </Link> */}
      <section className={styles.contList}>
        <span className={styles.badge01}>New Brand</span>
        <h3 className={styles.brandBigTit}>OOO한 브랜드를 소개합니다</h3>
        <div className={styles.contWrap}>
          <ul>
            <li>
              <div className={styles.contTxt}>
                <div className={styles.mainImg}>
                  <Image
                    src="/images/brand0_ban.jpg"
                    width={700}
                    height={700}
                  />
                </div>
                <div className={styles.mainTxt}>
                  {/* <h3 className={styles.bigTit}>감각적인 초록빛을 따라서</h3> */}
                  <p className={styles.subTit}>
                    자연을 닮은 브랜드 "
                    <strong className={styles.brandName}>스퀘어폰드</strong>"
                  </p>
                  <p className={styles.subTxt}>
                    Water plants habitat. 연못에 사는 동.식물을 이야기하는
                    스퀘어폰드입니다.
                  </p>
                  <span className={styles.contTxt}>어쩌구 저쩌구</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
