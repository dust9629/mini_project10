import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function adminBrands() {
  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>브랜드 소개글 관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link className={styles.active} href="/admin/brands">
              브랜드 관리
            </Link>
          </li>
          <li>
            <Link href="/admin/brands/register">브랜드 등록</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <span>등록된 브랜드 소개글</span>
          <div>
            <span>0</span> 개
          </div>
        </h3>
        <ul className={styles.adminList}>
          <li className={styles.cont}>
            <div className={styles.contImg}>
              <Image
                // src={}
                // alt={}
                src="/images/brand0_ban.jpg"
                alt="브랜드 소개 배너"
                width={300}
                height={350}
              />
            </div>
            <div className={styles.contTxt}>
              <h3 className={styles.bigTit}>감각적인 초록빛을 따라서</h3>
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
            <button className={styles.del}>
              <Image src="/images/icon_close.png" width={50} height={50} />
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
}
