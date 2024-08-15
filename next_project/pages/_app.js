import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import "@/styles/header.css";

export default function App({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header>
        <div className="header-inner">
          <div className="left">
            <Link href="/" className="logo-wrap">
              <Image
                src="/images/logo.png"
                alt="부들 로고"
                width={78}
                height={28}
              />
            </Link>
          </div>
          <div className="right">
            <Link href="/">
              <Image
                src="/images/icon_search.png"
                alt="찾아보기"
                width={50}
                height={50}
              />
            </Link>
            <Link href="/">
              <Image
                src="/images/icon_like_e.png"
                alt="좋아요"
                width={50}
                height={50}
              />
            </Link>
            <Link href="/">
              <Image
                src="/images/icon_cart.png"
                alt="장바구니"
                width={50}
                height={50}
              />
            </Link>
            <div
              className={`ham-btn ${isActive ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span className="h-01"></span>
              <span className="h-02"></span>
              <span className="h-03"></span>
            </div>
          </div>
        </div>
        <div className={`nav-menu ${isActive ? "active" : ""}`}>
          <div className="nav-header">
            <Link href="/">로그인 </Link>
          </div>
          <div className="nav-body">
            <div className="nav-banner">
              <p>배너를 넣을까 고민중</p>
            </div>
            <ul className="nav-tab">
              <li>
                <Link href="/list">전체보기</Link>
              </li>
              <li>
                <Link href="/">가구</Link>
              </li>
              <li>
                <Link href="/">소품</Link>
              </li>
              <li>
                <Link href="/">문구</Link>
              </li>
              <li>
                <Link href="/">기타</Link>
              </li>
              <li>
                <Link href="/">이벤트</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <Component {...pageProps} />
    </>
  );
}

// export default function RootLayout({ childeren }) {
//   return (
//     <html lang="en">
//       <body>
//         <div className="navbar">
//           <Link href="/" className="home">
//             Home
//           </Link>
//           <Link href="/list">List</Link>
//         </div>
//       </body>
//     </html>
//   );
// }
