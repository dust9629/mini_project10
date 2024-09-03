import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./../../index.module.css";

export default function AdminProducts() {
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    brand: "",
    prd_name: "",
    prd_price: "",
    categories: [],
  });

  // 카테고리 매핑
  const categoryLabels = {
    new_items: "신상품",
    best_items: "인기상품",
    housewarming: "집들이",
    birthday: "생일",
    anniversary: "기념일",
    thanks: "감사",
  };

  // 이미지 파일 선택 시 처리
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]); // 파일 선택 로그 확인
    setImage(e.target.files[0]);
  };

  // 텍스트 입력 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // 카테고리 선택 처리
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

  // 상품 사진 클라우디너리로 업로드
  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/boodle/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data.secure_url; // 업로드된 이미지의 URL 반환
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      throw error;
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("이미지를 첨부해 주세요.");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(); // 이미지를 Cloudinary에 업로드하고 URL을 받음
      const productData = { ...product, imageUrl }; // 기존 상품 데이터에 이미지 URL 추가

      // 서버로 상품 데이터를 보내고 응답 처리
      axios
        .post("/api/products/add", productData)
        .then((response) => {
          if (response.status === 200) {
            alert("상품이 성공적으로 등록되었습니다!");
            setProduct({
              brand: "",
              prd_name: "",
              prd_price: "",
              categories: [],
            });
            setImage(null); // 이미지 상태 초기화
          }
        })
        .catch((error) => {
          alert("상품 등록에 실패했습니다. " + error.message);
        });
    } catch (error) {
      alert("이미지 업로드에 실패했습니다. " + error.message);
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
            <Link href="/admin/products">상품 전체조회</Link>
          </li>
          <li>
            <Link className={styles.active} href="/admin/products/regi_main">
              상품 등록
            </Link>
          </li>
          {/* <li>
            <Link href="/admin/products/regi_gift">선물하기 등록</Link>
          </li> */}
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>일반 상품등록</h3>
        <div className={styles.register}>
          <form onSubmit={handleSubmit}>
            <label>
              <span>상품 이미지</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
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
              {Object.entries(categoryLabels).map(([key, label]) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    value={key}
                    onChange={handleCategoryChange}
                    checked={product.categories.includes(key)}
                  />{" "}
                  {label}
                </label>
              ))}
            </div>
            <button className={styles.registerBtn} type="submit">
              상품 등록하기
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
