import Link from "next/link";
import Image from "next/image";

export default function Home() {
  let curationTit = "지친 몸을 누일 수 있는 폭닥한 침구 ~50%";
  let category = ["집들이", "생일", "기념일", "감사"];
  let itemN = [
    "WAVE Bracket (5colors) [24SS NEW COLOR]",
    "SNOWMAN22 V2 Table 3Colors",
    "Line Floor Lamp Black",
    "네시노 오렌지 단스탠드 조명 Nessino Table Lamp Orange",
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
              <h2>이런 선물은 어떠세요?</h2>
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
              <h2>New Item</h2>
              <Link href="/lits">+</Link>
            </div>
            <ul className="cont-wrap">
              {itemN.map((a, i) => {
                return (
                  <li className="cont" key={i}>
                    <div className="cont-img">
                      <Image
                        src={`/images/item_n${i}.jpg`}
                        alt={itemN[i]}
                        width={300}
                        height={600}
                      ></Image>
                    </div>
                    <div className="cont-txt">
                      <span className="prd-brand">Brand</span>
                      <h3 className="prd-name">{itemN[i]}</h3>
                      <p className="prd-price">
                        <strong>10,000</strong>원
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      {/* 베스트 상품 */}
      <section className="section04">
        <div className="inner-wrap n4">
          <div className="best-wrap">
            <h2>Best Item</h2>
          </div>
        </div>
      </section>
      <section className="section05">
        <div className="inner-wrap n5">
          <div className="cura-wrap">
            <h2>Curation</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
