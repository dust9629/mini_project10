import Link from "next/link";
import Image from "next/image";
import styles from "./../../index.module.css";
import React, { useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

export default function RegisterBrands() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [image, setImage] = useState(null);
  const [brandData, setBrandData] = useState({
    brandBigTit: "",
    brandSubTit: "",
    brandName: "",
    brandSubTxt: "",
  });

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const brandDescTxt = JSON.stringify(convertToRaw(contentState));

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your_preset_here");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      const imageUrl = uploadRes.data.secure_url;

      const brandCompleteData = { ...brandData, imageUrl, brandDescTxt };

      const response = await axios.post("/api/brands/add", brandCompleteData);
      if (response.status === 200) {
        alert("브랜드가 성공적으로 등록되었습니다!");
        // Clear the form
        setBrandData({
          brandBigTit: "",
          brandSubTit: "",
          brandName: "",
          brandSubTxt: "",
        });
        setEditorState(EditorState.createEmpty());
        setImage(null);
      }
    } catch (error) {
      alert("브랜드 등록에 실패했습니다. " + error.message);
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
        <h3 className={styles.adminTit}>브랜드 소개글 관리</h3>
        <ul className={styles.admintab}>
          <li>
            <Link href="/admin/brands">브랜드 관리</Link>
          </li>
          <li>
            <Link className={styles.active} href="/admin/brands/register">
              브랜드 등록
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.adminBtm}>
        <h3 className={styles.adminTit}>브랜드 소개글 등록</h3>
        <div className={styles.register}>
          <form onSubmit={handleSubmit}>
            <label>
              <span>브랜드 소개글 제목</span>
              <input
                type="text"
                name="brandBigTit"
                value={brandData.brandBigTit}
                onChange={handleChange}
                placeholder="대표 제목을 입력하세요."
              />
            </label>
            <label>
              <span>메인 이미지</span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
            <label>
              <span>브랜드 서브 제목</span>
              <input
                type="text"
                name="brandSubTit"
                value={brandData.brandSubTit}
                onChange={handleChange}
                placeholder="소제목을 입력하세요."
              />
            </label>
            <label>
              <span>브랜드명</span>
              <input
                type="text"
                name="brandName"
                value={brandData.brandName}
                onChange={handleChange}
                placeholder="브랜드 이름"
              />
            </label>
            <label>
              <span>브랜드 슬로건</span>
              <textarea
                name="brandSubTxt"
                value={brandData.brandSubTxt}
                onChange={handleChange}
                placeholder="브랜드 슬로건을 입력하세요."
              />
            </label>
            <label className={styles.editorCont}>
              <span>브랜드 소개글 내용</span>
              <div className={styles.editorWrapper}>
                <Editor
                  editorState={editorState}
                  onChange={handleEditorChange}
                  placeholder="상세 설명을 입력하세요."
                  editorKey="editor"
                />
              </div>
            </label>

            <button type="submit" className={styles.registerBtn}>
              등록하기
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
