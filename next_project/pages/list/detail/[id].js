import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import ReviewSection from "../../../components/review";
import { useRouter } from "next/router";
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
      return { props: { error: "상품을 찾을 수 없습니다." } };
    }
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (error) {
    return { props: { error: "상품 정보를 가져오는 데 실패했습니다." } };
  }
}

export default function Detail({ product, error }) {
  const router = useRouter();

  if (error) {
    return <p>오류: {error}</p>;
  }
  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const addToCart = () => {
    if (product.stock === 0) {
      alert("품절된 상품입니다.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToSave = {
      _id: product._id,
      name: product.prd_name,
      price: product.prd_price,
      imageUrl: product.imageUrl,
      brand: product.brand,
    };

    // 중복 상품 검사
    const isProductExist = cart.some((item) => item._id === product._id);
    if (isProductExist) {
      alert("이미 장바구니에 있는 상품입니다.");
      return;
    }

    cart.push(productToSave);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 추가되었습니다.");

    // Custom 이벤트 발생
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };
  // 상품을 장바구니에 추가
  const buyNow = () => {
    if (product.stock === 0) {
      alert("품절된 상품입니다.");
      return;
    }
    addToCart();
    router.push(`/cart/order`);
  };

  const notifyFeatureUnavailable = () => {
    alert("해당 기능은 준비중입니다.");
  };

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
              alt={`product.prd_name`}
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles.prdTxt}>
            <span className={styles.prdBrand}>{product.brand}</span>
            <div className={styles.prdTit}>
              <h3>
                {product.stock === 0 && (
                  <span className={styles.soldOut}>품절</span>
                )}
                {product.prd_name}
              </h3>
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
              {/* <button className={styles.cart}>장바구니</button> */}
              <button className={styles.cart} onClick={addToCart}>
                장바구니
              </button>
              <button className={styles.buy} onClick={buyNow}>
                구매하기
              </button>
            </p>
            <button className={styles.gift} onClick={notifyFeatureUnavailable}>
              선물하기
            </button>
          </div>
        </div>
      </section>
      <section className={styles.prd}>
        <h3 className={styles.listTit}>상세 정보</h3>
        <div className={styles.prdDetails}>
          <div className={styles.detailsTop}>
            <i className="fas fa-couch"></i>
            <Image
              className={styles.logoDetail}
              src="/images/logo.png"
              alt="부들 로고"
              width={78}
              height={28}
            />
            <p>
              부들은 부들부들한 감촉만큼 부드럽고
              <br />
              안락한 공간으로 만들어 드립니다.
            </p>
          </div>

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
