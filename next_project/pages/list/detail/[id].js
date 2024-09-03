import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import ReviewSection from "../../../components/review";
import { connectDB } from "../../../util/database";
import { ObjectId } from "mongodb";

export async function getServerSideProps(context) {
  const { db } = await connectDB();
  const productId = context.params.id; // URL에서 상품 ID를 추출

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    if (!product) {
      console.log("No product found for ID:", productId);
      return { props: { error: "No product found." } };
    }
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return { props: { error: "Failed to fetch product." } };
  }
}

export default function Detail({ product, error }) {
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <main className={styles.productDetail}>
      <Link className={styles.back} href="/list">
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
              src={product.imageUrl}
              alt={product.prd_name}
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles.prdTxt}>
            <span className={styles.prdBrand}>{product.brand}</span>
            <div className={styles.prdTit}>
              <h3>{product.prd_name}</h3>
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
            src={product.imageUrl}
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
