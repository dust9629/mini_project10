import Link from "next/link";
import Image from "next/image";
import styles from "./../index.module.css";
import { useEffect, useState } from "react";
import ReviewSection from "../../../components/review";
// import CommentSection from "./../components/comment";

let brandItem = [
  {
    name: "괴마옥 & 이끼코스터 SET",
    brand: "스퀘어폰드",
    price: "28,000",
  },
  {
    name: "스프링골풀 칼라팟 2TYPE",
    brand: "스퀘어폰드",
    price: "24,000",
  },
  {
    name: "비즈 스트랩 키링 - 머쉬룸",
    brand: "스퀘어폰드",
    price: "12,000",
  },
  {
    name: "이끼 코스터 SET - 4TYPE",
    brand: "스퀘어폰드",
    price: "18,000",
  },
  {
    name: "비즈 스트랩 키링 - 메다카",
    brand: "스퀘어폰드",
    price: "12,000",
  },
  {
    name: "청짜보(연산회) 미니 분재",
    brand: "스퀘어폰드",
    price: "35,000",
  },
  {
    name: "이끼 코스터 4TYPE",
    brand: "스퀘어폰드",
    price: "9,000",
  },
  {
    name: "파티오라금 청산호 미니화분",
    brand: "스퀘어폰드",
    price: "24,000",
  },
];

export default function BrandDetail() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      // "https://www.instagram.com/square.pond?igsh=amZ2azlqMDc1dzd0"
      "https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=YOUR_ACTUAL_ACCESS_TOKEN"
    )
      .then((response) => response.json())
      .then((data) => setPosts(data.data))
      .catch((error) => console.error("Error fetching Instagram posts", error));
  }, []);

  return (
    <main className={styles.brandStory}>
      <Link className={styles.back} href="/">
        <Image src="/images/icon_arrow_back.png" width={200} height={50} />
      </Link>
      <section className={styles.mainBan}>
        <span className={styles.badge01}>New Brand</span>
        <h3 className={styles.brandBigTit}>신규 입점된 브랜드를 소개합니다</h3>
        <div className={styles.mainImg}>
          <Image src="/images/brand0_ban.jpg" width={700} height={700} />
        </div>
        <div className={styles.brandMainTxt}>
          <h4 className={styles.brandSubTit}>
            자연을 닮은 브랜드{" "}
            <strong className={styles.brandName}>"스퀘어폰드"</strong>
          </h4>
          <p className={styles.brandSubTxt}>
            Water plants habitat. 연못에 사는 동.식물을 이야기하는
            스퀘어폰드입니다.
          </p>
          <p className={styles.brandDescTxt}>
            보글보글 이끼를 닮은 코스터와 현무암을 연상시키는 플랜트 팟은
            식집사들의 마음을 훔치는 것만이 아니라, 그 자체로 한 폭의 자연
            풍경을 연출합니다. 각 제품은 자연에서 그대로 옮겨온 듯한 느낌을
            선사하며, 실내 어디에 두어도 자연스러운 아름다움을 자아냅니다.
            <br />
            <br />
            스퀘어 폰드의 제품들은 모두 자연을 닮기 위해 세심하게
            설계되었습니다. 연못의 식물과 동물에서 영감을 얻어, 장인의 손길로
            하나하나 정성스레 만들어진 이 제품들은 사용하는 이로 하여금 평온함과
            안정감을 제공합니다. 이는 단순한 화분이나 깔개가 아닌, 살아 있는
            생명처럼 느껴지게 하는 스퀘어 폰드만의 마법입니다.
            <br />
            <br />이 브랜드는 지속 가능한 생활을 추구하는 현대인들에게
            안성맞춤입니다. 자연과의 조화를 중시하는 철학 아래, 모든 제품은
            친환경적인 재료를 사용하여 제작되며, 이는 우리가 추구하는 지속
            가능한 미래를 향한 작은 발걸음이 됩니다
          </p>
        </div>
      </section>
      <section className={styles.prdList}>
        <div className={styles.prdWrap}>
          <ul className="cont-wrap">
            {brandItem.map((item, i) => (
              <li className="cont" key={i}>
                <Link href="/list/detail">
                  <div className="cont-img">
                    <Image
                      src={`/images/brand0_${i}.jpg`}
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
      <section className={styles.instagram}>
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <img src={post.media_url} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      </section>
      <ReviewSection />
    </main>
  );
}