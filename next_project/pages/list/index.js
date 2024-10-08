import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { connectDB } from "../../util/database";

export default function List({ products }) {
  const categoryLabels = {
    all: "전체보기",
    new_items: "신상품",
    best_items: "인기상품",
    housewarming: "집들이",
    birthday: "생일",
    anniversary: "기념일",
    thanks: "감사",
  };

  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    filterProducts(activeCategory);
  }, [activeCategory, products]);

  function filterProducts(category) {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.includes(category)
      );
      setFilteredProducts(filtered);
    }
  }

  return (
    <main className={styles.productList}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.listTop}>
        <div>
          <h3 className={styles.listTit}>상품 리스트</h3>
          {/* <ul className={styles.listSort}>
            <li className={styles.active}># 기념일</li>
            <li># 생일</li>
            <li># 축하</li>
            <li># 감사</li>
          </ul> */}
          <ul className={styles.listSort}>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <li
                key={key}
                className={activeCategory === key ? styles.active : ""}
                onClick={() => setActiveCategory(key)}
              >
                #{label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.prdList}>
        <div className={styles.prdWrap}>
          {/* <ul className="cont-wrap">
            {itemsB.map((item, i) => (
              <li className="cont" key={i}>
                <Link href="/list/detail">
                  <div className="cont-img">
                    <Image
                      src={`/images/item_b${i}.jpg`}
                      alt={item.name}
                      width={300}
                      height={600}
                    />
                  </div>
                  <div className="cont-txt">
                    <span className="prd-brand">{item.brand}</span>
                    <h3 className="prd-name">{item.name}</h3>
                    <p className="prd-price">
                      <strong>{item.price}</strong>원
                    </p>
                  </div>
                </Link>
                <p className="like-btn">
                  <Image
                    src="/images/icon_like_e.png"
                    className="like-e"
                    width={35}
                    height={35}
                  />
                  <Image
                    src="/images/icon_like_f.png"
                    className="like-f"
                    width={35}
                    height={35}
                  />
                </p>
              </li>
            ))}
          </ul> */}
          <ul className="cont-wrap">
            {filteredProducts.map((item, i) => (
              <li className="cont" key={item._id}>
                <Link href={`/list/detail/${item._id}`}>
                  <div className="cont-img">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={300}
                      height={600}
                    />
                  </div>
                  <div className="cont-txt">
                    <span className="prd-brand">{item.brand}</span>
                    <h3 className="prd-name">{item.name}</h3>
                    <p className="prd-price">
                      <strong>{item.price}</strong>원
                    </p>
                  </div>
                </Link>
                <p className="like-btn">
                  <Image
                    src="/images/icon_like_e.png"
                    className="like-e"
                    width={35}
                    height={35}
                  />
                  <Image
                    src="/images/icon_like_f.png"
                    className="like-f"
                    width={35}
                    height={35}
                  />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const { db } = await connectDB();
  const products = await db.collection("products").find({}).toArray();
  const serializedProducts = products.map((product) => ({
    _id: product._id.toString(),
    name: product.prd_name,
    brand: product.brand,
    price: product.prd_price,
    imageUrl: product.imageUrl,
    categories: product.categories,
  }));

  return { props: { products: serializedProducts } };
}
