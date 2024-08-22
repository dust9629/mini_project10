import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import ReviewSection from "../../../components/review";
import { connectDB } from "@/util/database";

export async function getServerSideProps(context) {
  const client = await connectDB();
  try {
    const db = client.db("boodle");
    const product = await db.collection("product").findOne(); // 상품 하나만 조회
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (error) {
    return { props: { error: "Failed to fetch data." } };
  } finally {
    await client.close();
  }
}

export default function Detail({ product, error }) {
  if (error) {
    return <p>Error: Failed to load product.</p>;
  }
  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <main className={styles.productDetail}>
      <Link className={styles.back} href="/">
        <Image
          src="/images/icon_arrow_back.png"
          alt="뒤로가기"
          width={200}
          height={50}
        />
      </Link>

      <section className={styles.prd}>
        <div className={styles.prdInfo}>
          <div className={styles.prdImg}>
            <Image
              src="/images/brand0_0.jpg"
              alt="상품 이미지"
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles.prdTxt}>
            <span className={styles.prdBrand}>{product.brand}</span>
            <div className={styles.prdTit}>
              <h3>{product.prd_tit}</h3>
              <p className={styles.likeBtn}>
                <Image
                  src="/images/icon_like_e.png"
                  className={styles.likeE}
                  width={35}
                  height={35}
                  alt="좋아요 아이콘(빈)"
                />
                <Image
                  src="/images/icon_like_f.png"
                  className={styles.likeF}
                  width={35}
                  height={35}
                  alt="좋아요 아이콘(찬)"
                />
              </p>
            </div>
            <p className={styles.prdPrice}>
              <strong>{product.prd_price}</strong>원
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
          <Image
            src="/images/brand0_0.jpg"
            alt="상품 상세이미지"
            width={700}
            height={700}
          />
        </div>
      </section>
      <ReviewSection />
    </main>
  );
}
