import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // 기본 스타일
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import "swiper/css/autoplay";
import EventPopup from "../components/popup";
import LikeButton from "../components/LikeButton";
import { connectDB } from "../util/database";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function Home({ newItems, bestItems }) {
  let curationTit = "지친 몸을 누일 수 있는 폭닥한 침구 ~50%";
  let category = ["집들이", "생일", "기념일", "감사"];

  const [user, setUser] = useState(null);
  useEffect(() => {
    // 토큰 처리 로직
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      // 초기 URL에서 쿼리 파라미터 제거
      window.history.pushState({}, document.title, "/");
    }
    // 로컬 스토리지에서 사용자 ID 가져오기
    const userId = localStorage.getItem("userId");
    setUser({ _id: userId });
  }, []);

  // 페이지 컴포넌트가 로드될 때 사용자의 세션에서 사용자 ID를 가져와야 함 (좋아요 기능)

  const slidesCura = [
    {
      image: "/images/cura0.jpg",
      title: "요즘 트렌드는 마쉬멜로우 색감의 세면대",
      writer: "엘리스",
    },
    {
      image: "/images/cura1.jpg",
      title: "툭툭 쌓인 소서는 설거지를 즐겁게 해",
      writer: "폴킴도라이죠",
    },
    {
      image: "/images/cura2.jpg",
      title: "쉽고 편하게 좋아하는 공간을 만드는 방법",
      writer: "몬스터",
    },
    {
      image: "/images/cura3.jpg",
      title: "감성 가득한 인테리어의 심장은 조명",
      writer: "몬스터",
    },
    {
      image: "/images/cura4.jpg",
      title: "더 이상은 수납하지 않아도 괜찮아",
      writer: "몬스터",
    },
  ];
  return (
    <main>
      {/* 큐레이션 배너 */}
      <section className="section01">
        <Swiper
          // spaceBetween={50}
          // key={someChangingValue}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Link href="/event" className="inner-wrap n1">
              <div className="main-ban-wrap">
                <div className="curation_ban">
                  <Image
                    src="/images/main_ban01.webp"
                    alt="메인배너1"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="main-txt-wrap">
                <h4 className="title-main">{curationTit}</h4>
                <p className="title-sub">VOL. 여름의 끝자락에서 만난 가을</p>
                <p className="title-writer">
                  <span>curator. 레이첼 그린</span>
                  <span className="title-arrow">
                    <Image
                      src="/images/icon_arrow_ban.png"
                      alt="더보기"
                      width={100}
                      height={100}
                    />
                  </span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/event" className="inner-wrap n2">
              <div className="main-ban-wrap">
                <div className="curation_ban">
                  <Image
                    src="/images/main_ban02.webp"
                    alt="메인배너2"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="main-txt-wrap">
                <h4 className="title-main">{curationTit}</h4>
                <p className="title-sub">VOL. 여름의 끝자락에서 만난 가을</p>
                <p className="title-writer">
                  <span>curator. 레이첼 그린</span>
                  <span className="title-arrow">
                    <Image
                      src="/images/icon_arrow_ban.png"
                      alt="더보기"
                      width={100}
                      height={100}
                    />
                  </span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/event" className="inner-wrap n3">
              <div className="main-ban-wrap">
                <div className="curation_ban">
                  <Image
                    src="/images/main_ban03.webp"
                    alt="메인배너3"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="main-txt-wrap">
                <h4 className="title-main">{curationTit}</h4>
                <p className="title-sub">VOL. 여름의 끝자락에서 만난 가을</p>
                <p className="title-writer">
                  <span>curator. 레이첼 그린</span>
                  <span className="title-arrow">
                    <Image
                      src="/images/icon_arrow_ban.png"
                      alt="더보기"
                      width={100}
                      height={100}
                    />
                  </span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* 선물 추천 카테고리 */}
      <section className="section02">
        <div className="inner-wrap n2">
          <div className="gift-wrap">
            <div className="section-tit">
              <h2>감각있는 당신을 위한 센스있는 선물</h2>
            </div>
            <ul>
              <li className="n1">
                <Link href="/list">{category[0]}</Link>
              </li>
              <li className="n2">
                <Link href="/list">{category[1]}</Link>
              </li>
              <li className="n3">
                <Link href="/list">{category[2]}</Link>
              </li>
              <li className="n4">
                <Link href="/list">{category[3]}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* 새로운 상품 */}
      <section className="section03">
        <div className="inner-wrap n3">
          <div className="new-wrap">
            <div className="section-tit">
              <h2>새로운 아이템</h2>
              <Link href="/list">+</Link>
            </div>
            <ul className="cont-wrap">
              {newItems.map((item, index) => (
                <li className="cont" key={index}>
                  <Link href={`/list/detail/${item._id}`}>
                    <div className="cont-img">
                      <Image
                        src={item.imageUrl}
                        alt={item.prd_name}
                        width={300}
                        height={600}
                      />
                    </div>
                    <div className="cont-txt">
                      <span className="prd-brand">{item.brand}</span>
                      <h3 className="prd-name">
                        {/* <span className="sold-out">품절</span> */}
                        {item.prd_name}
                      </h3>
                      <p className="prd-price">
                        <strong>{item.prd_price}</strong>원
                      </p>
                    </div>
                  </Link>
                  <p className="like-btn">
                    <LikeButton userId={user?._id} itemId={item._id} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* 이벤트 브랜드 */}
      <section className="section04">
        <div className="inner-wrap n4">
          <div className="brand-wrap">
            <div className="section-tit">
              <h2>감각적인 초록빛을 따라서</h2>
              <Link href="/brand">+</Link>
            </div>
            <div className="brand-story">
              <Link href="/brand/detail" className="story-img">
                <Image
                  src="/images/brand0_ban.jpg"
                  alt="스퀘어폰드"
                  width={700}
                  height={700}
                />
              </Link>

              <div className="story-txt">
                <h4>자연을 닮은 브랜드 "스퀘어폰드"</h4>
                <p>
                  보글보글 이끼를 닮은 코스터와 현무암을 연상시키는 플랜트 팟은
                  식집사들의 마음을 훔치는 것만이 아니라, 그 자체로 한 폭의 자연
                  풍경을 연출합니다. 각 제품은 자연에서 그대로 옮겨온 듯한
                  느낌을 선사하며, 실내 어디에 두어도 자연스러운 아름다움을
                  자아냅니다. 스퀘어 폰드의 제품들은 모두 자연을 닮기 위해
                  세심하게 설계되었습니다. 연못의 식물과 동물에서 영감을 얻어,
                  장인의 손길로 하나하나 정성스레 만들어진 이 제품들은 사용하는
                  이로 하여금 평온함과 안정감을 제공합니다. 이는 단순한 화분이나
                  깔개가 아닌, 살아 있는 생명처럼 느껴지게 하는 스퀘어 폰드만의
                  마법입니다.
                </p>
              </div>
              <div className="story-prd">
                <div className="story-prd-img">
                  <Image
                    src="/images/brand0_0.jpg"
                    alt="브랜드 이미지"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="cont-txt">
                  <span className="prd-brand">스퀘어폰드</span>
                  <h3 className="prd-name">괴마옥 & 이끼코스터 SET</h3>
                  <p className="prd-price">
                    <strong>28,000</strong>원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 베스트 상품 */}
      <section className="section05">
        <div className="inner-wrap n5">
          <div className="best-wrap">
            <div className="section-tit">
              <h2>인기있는 아이템</h2>
              <Link href="/list">+</Link>
            </div>
            <ul className="cont-wrap">
              {bestItems.map((item, index) => (
                <li className="cont" key={index}>
                  <Link href={`/list/detail/${item._id}`}>
                    <div className="cont-img">
                      <Image
                        src={item.imageUrl}
                        alt={item.prd_name}
                        width={300}
                        height={600}
                      />
                    </div>
                    <div className="cont-txt">
                      <span className="prd-brand">{item.brand}</span>
                      <h3 className="prd-name">{item.prd_name}</h3>
                      <p className="prd-price">
                        <strong>{item.prd_price}</strong>원
                      </p>
                    </div>
                  </Link>
                  <p className="like-btn">
                    <LikeButton userId={user?._id} itemId={item._id} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* 큐레이션 */}
      <section className="section06">
        <div className="inner-wrap n6">
          <div className="cura-wrap">
            <div className="section-tit">
              <h2>큐레이션 공간</h2>
              <Link href="/list">+</Link>
            </div>
            <div className="cura-slide">
              <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                navigation={true} // 네비게이션 활성화
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {slidesCura.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Link href="/curation">
                      <img src={slide.image} alt={slide.title} />
                      <div className="cura-slide-txt">
                        <h4>{slide.title}</h4>
                        <p>
                          <strong>curator.</strong>
                          {slide.writer}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <EventPopup />
    </main>
  );
}
export async function getServerSideProps() {
  try {
    const { db } = await connectDB();
    const newItemsData = await db
      .collection("products")
      .find({ categories: "new_items" })
      .sort({ _id: -1 })
      .limit(4)
      .toArray();
    const bestItemsData = await db
      .collection("products")
      .find({ categories: "best_items" })
      .sort({ _id: -1 })
      .limit(4)
      .toArray();

    const newItems = newItemsData.map((item) => ({
      _id: item._id.toString(),
      imageUrl: item.imageUrl,
      brand: item.brand,
      prd_name: item.prd_name,
      prd_price: item.prd_price,
    }));

    const bestItems = bestItemsData.map((item) => ({
      _id: item._id.toString(),
      imageUrl: item.imageUrl,
      brand: item.brand,
      prd_name: item.prd_name,
      prd_price: item.prd_price,
    }));

    return { props: { newItems, bestItems } };
  } catch (error) {
    console.error("데이터베이스 연결에 실패하였습니다.", error);
    return { props: { newItems: [], bestItems: [] } }; // 오류가 발생한 경우 빈 배열 반환
  }
}
