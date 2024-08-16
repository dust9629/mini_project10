import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css"; // 기본 스타일
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import "swiper/css/autoplay";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function Home() {
  let curationTit = "지친 몸을 누일 수 있는 폭닥한 침구 ~50%";
  let category = ["집들이", "생일", "기념일", "감사"];
  let itemsN = [
    {
      name: "WAVE Bracket (5colors) [24SS NEW COLOR]",
      brand: "베르몬드",
      price: "120,000",
    },
    { name: "SNOWMAN22 V2 Table 3Colors", brand: "일광전구", price: "250,000" },
    {
      name: "Line Floor Lamp Black",
      brand: "에프에프 컬렉티브",
      price: "380,000",
    },
    {
      name: "네시노 오렌지 단스탠드 조명 Nessino Table Lamp Orange",
      brand: "아르떼미데",
      price: "320,000",
    },
  ];

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
  ];

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
        <Link href="/" className="inner-wrap n1">
          <div className="main-ban-wrap">
            <div href="/" className="curation_ban">
              <Image
                src="/images/main_ban01.jpg"
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
              <span>
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
      </section>
      {/* 선물 추천 카테고리 */}
      <section className="section02">
        <div className="inner-wrap n2">
          <div className="gift-wrap">
            <div className="section-tit">
              <h2>감각있는 당신을 위한 센스있는 선물</h2>
            </div>
            <ul>
              <li>
                <div>{category[0]}</div>
              </li>
              <li>
                <div>{category[1]}</div>
              </li>
              <li>
                <div>{category[2]}</div>
              </li>
              <li>
                <div>{category[3]}</div>
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
              {itemsN.map((item, i) => (
                <li className="cont" key={i}>
                  <Link href="/list/detail">
                    <div className="cont-img">
                      <Image
                        src={`/images/item_n${i}.jpg`}
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
        </div>
      </section>
      {/* 중간 배너 */}
      <section className="banner">
        <div className="ban-wrap">
          <Link href="/">
            <Image src={"/images/ban01.png"} width={650} height={300} />
            <p className="ban-txt">
              <Image src={"/images/logo_tounou.png"} width={300} height={60} />
              <span>뚜누만의 어쩌구</span>
            </p>
          </Link>
        </div>
        <div className="ban-wrap">
          <Link href="/">
            <Image src={"/images/ban02.png"} width={650} height={300} />
            <p className="ban-txt">
              <Image src={"/images/logo_artish.png"} width={300} height={60} />
              <span>뚜누만의 어쩌구</span>
            </p>
          </Link>
        </div>
      </section>
      {/* 베스트 상품 */}
      <section className="section04">
        <div className="inner-wrap n4">
          <div className="best-wrap">
            <div className="section-tit">
              <h2>인기있는 아이템</h2>
              <Link href="/list">+</Link>
            </div>
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
        </div>
      </section>
      {/* 큐레이션 */}
      <section className="section05">
        <div className="inner-wrap n5">
          <div className="cura-wrap">
            <div className="section-tit">
              <h2>큐레이션 공간</h2>
              <Link href="/list">+</Link>
            </div>
            <div className="cura-slide">
              <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                navigation
                pagination={{ clickable: true }}
                loop={true} // 무한 반복
                autoplay={{
                  // 자동 재생 설정
                  delay: 2500, // 2.5초 지연
                  disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
                }}
              >
                {slidesCura.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <img src={slide.image} alt={slide.title} />
                    <div className="cura-slide-txt">
                      <h4>{slide.title}</h4>
                      <p>
                        <strong>curator.</strong>
                        {slide.writer}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
