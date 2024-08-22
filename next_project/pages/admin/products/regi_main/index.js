import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./../../index.module.css";

export default function AdminProducts() {
  // let prdList = [
  //   {
  //     name: "감성 인테리어 파키라+페블 화분+흙없이 실내에서 키우는 식물 축하 선물 (블랙&화이트)",
  //     brand: "본투비그린",
  //     price: "23,900",
  //   },
  //   {
  //     name: "[화분 받침] Art Pot 받침",
  //     brand: "슈퍼마켙 플라워",
  //     price: "3,000",
  //   },
  //   {
  //     name: "미니 히노키 pearl",
  //     brand: "큐이디",
  //     price: "50,000",
  //   },
  //   {
  //     name: "해송소나무 테라스톤세트 미니분재",
  //     brand: "펫플랜트",
  //     price: "52,800",
  //   },
  // ];
  const [product, setProduct] = useState({
    brand: "",
    prd_name: "",
    prd_price: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setProduct((prevState) => ({
        ...prevState,
        categories: [...prevState.categories, value],
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        categories: prevState.categories.filter((c) => c !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products/add", product);
      if (response.status === 200) {
        alert("Product successfully added!");
        // Optionally reset form or other actions
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      alert("Failed to add product. " + error.message);
    }
  };

  return (
    <main className={styles.admin}>
      <Link className={styles.back} href="/admin">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.adminTop}>
        <h3 className={styles.adminTit}>상품관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link href="/admin/products">상품 전체조회</Link>
          </li>
          <li>
            <Link className={styles.active} href="/admin/products/regi_main">
              일반상품 등록
            </Link>
          </li>
          <li>
            <Link href="/admin/products/regi_gift">선물하기 등록</Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>일반 상품등록</h3>
        <div className={styles.register}>
          <form onSubmit={handleSubmit}>
            <label>
              <span>브랜드명</span>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>상품명</span>
              <input
                type="text"
                name="prd_name"
                value={product.prd_name}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>가격</span>
              <input
                type="text"
                name="prd_price"
                value={product.prd_price}
                onChange={handleChange}
              />
            </label>
            <div>
              <span>카테고리 분류</span>
              <label>
                <input
                  type="checkbox"
                  value="new_items"
                  onChange={handleCategoryChange}
                />{" "}
                새로운 아이템
              </label>
              <label>
                <input
                  type="checkbox"
                  value="best_items"
                  onChange={handleCategoryChange}
                />{" "}
                인기있는 아이템
              </label>
            </div>
            <button className={styles.registerBtn} type="submit">
              상품 등록하기
            </button>
          </form>
        </div>
        <ul className={styles.adminList}>
          {/* {prdList.map((item, i) => (
            <li className={styles.prd} key={i}>
              <div className={styles.prdImg}>
                <Image
                  src={`/images/item_b${i}.jpg`}
                  alt={item.name}
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.PrdTxt}>
                <span className={styles.prdBrand}>{item.brand}</span>
                <h3 className={styles.prdPrdName}>{item.name}</h3>
                <p className={styles.prdPrice}>
                  재고수량 : <span className={styles.prdCount}>1</span>
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                  <strong>{item.price}</strong>원
                </p>
              </div>
              <button className={styles.del}>
                <Image src="/images/icon_close.png" width={50} height={50} />
              </button>
            </li>
          ))} */}
        </ul>
      </section>
    </main>
  );
}
