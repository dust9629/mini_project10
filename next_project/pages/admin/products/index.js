import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("상품을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchProducts();
  }, []);

  const categoryLabels = {
    new_items: "신상품",
    best_items: "인기상품",
    housewarming: "집들이",
    birthday: "생일",
    anniversary: "기념일",
    thanks: "감사",
    all: "전체보기",
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" ||
      product.categories.includes(selectedCategory)
  );

  const deleteProduct = async (productId) => {
    if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`/api/products/${productId}`);
        if (response.status === 200) {
          alert("상품이 삭제되었습니다.");
          setProducts(products.filter((product) => product._id !== productId));
        }
      } catch (error) {
        console.error("상품 삭제에 실패했습니다.", error);
        alert("상품 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image
          src="/images/icon_arrow_back.png"
          alt="뒤로가기"
          width={200}
          height={50}
        />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>상품관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link className={styles.active} href="/admin/products">
              상품 전체조회
            </Link>
          </li>
          <li>
            <Link href="/admin/products/regi_main">상품 등록</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>
          <span>상품 전체조회</span>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </h3>
        <ul className={styles.adminList}>
          {filteredProducts.map((product, index) => (
            <li className={styles.prd} key={index}>
              <div className={styles.prdImg}>
                <Image
                  src={product.imageUrl || "/images/placeholder.png"}
                  alt={product.prd_name}
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.PrdTxt}>
                <div className={styles.cateBadge}>
                  {product.categories.map((cat) => (
                    <span key={cat}>{categoryLabels[cat]}</span>
                  ))}
                </div>
                <span className={styles.prdBrand}>
                  <strong>{product.brand}</strong> / 수량 :{" "}
                  <strong>{product.stock}</strong>
                </span>
                <h3 className={styles.prdPrdName}>{product.prd_name}</h3>
                <p className={styles.prdPrice}>
                  <strong>{product.prd_price}</strong>원
                </p>
              </div>
              <button
                className={styles.del}
                onClick={() => deleteProduct(product._id)}
              >
                <Image src="/images/icon_close.png" width={50} height={50} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
