import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

let itemsB = [
  {
    name: "감성 인테리어 파키라+페블 화분+흙없이 실내에서 키우는 식물 축하 선물 (블랙&화이트)",
    brand: "본투비그린",
    price: "23,900",
  },
  {
    name: "[화분 받침] Art Pot 받침",
    brand: "슈퍼마켙 플라워",
    price: "3,000",
  },
  {
    name: "미니 히노키 pearl",
    brand: "큐이디",
    price: "50,000",
  },
  {
    name: "해송소나무 테라스톤세트 미니분재",
    brand: "펫플랜트",
    price: "52,800",
  },
  {
    name: "감성 인테리어 파키라+페블 화분+흙없이 실내에서 키우는 식물 축하 선물 (블랙&화이트)",
    brand: "본투비그린",
    price: "23,900",
  },
  {
    name: "[화분 받침] Art Pot 받침",
    brand: "슈퍼마켙 플라워",
    price: "3,000",
  },
  {
    name: "미니 히노키 pearl",
    brand: "큐이디",
    price: "50,000",
  },
  {
    name: "해송소나무 테라스톤세트 미니분재",
    brand: "펫플랜트",
    price: "52,800",
  },
];

export default function Like() {
  return (
    <main className={styles.productLike}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.likeTop}>
        <div>
          <h3 className={styles.likeTit}>좋아요 리스트</h3>
        </div>
      </section>

      <section className={styles.prdList}>
        <div className={styles.prdWrap}>
          <ul className="cont-wrap">
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
          </ul>
        </div>
      </section>
    </main>
  );
}
