import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // useRouter를 import
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/footer.css";

export default function App({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";
    setUserRole(role);
  }, [router.asPath]);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsActive(false); // 페이지 이동 시 메뉴 상태 초기화
      const role = localStorage.getItem("userRole") || "";
      setUserRole(role);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
            <Link href="/like">
              <Image
                src="/images/icon_like_e.png"
                alt="좋아요"
                width={50}
                height={50}
              />
            </Link>
            <Link href="/cart">
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
            <Link
              className={`member ${!userRole ? "active" : ""}`}
              href="/member"
            >
              로그인 / 회원가입
            </Link>
            <Link
              className={`mypage ${userRole === "normember" ? "active" : ""}`}
              href="/mypage"
            >
              마이페이지
            </Link>
            <Link
              className={`admin ${userRole === "admin" ? "active" : ""}`}
              href="/admin"
            >
              관리자 페이지
            </Link>
          </div>

          <div className="nav-body">
            <div className="nav-banner">
              <p>
                <Link href="/curation">큐레이션</Link>
              </p>
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
            <Link className="logout" href="/" onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        </div>
      </header>
      <Component {...pageProps} />
      {showTopBtn && (
        <button className="top-btn" onClick={scrollToTop}>
          Top
        </button>
      )}
      <footer>
        <div className="footer-inner">
          <div className="footer-content">
            <h3>Contact info.</h3>
            <p></p>
            <p>
              전화번호: 010-8696-9388&nbsp;&nbsp;|&nbsp;&nbsp;이메일:
              dust9629@gmail.com
            </p>
            <p>© dust9629 all rights reserved</p>
          </div>
          <div className="footer-links">
            <Link target="_blank" href="/">
              Resume
            </Link>
            &nbsp;|&nbsp;
            <Link
              target="_blank"
              href="https://treasure-wolverine-e71.notion.site/d6fb630e6b9d4158b2c6436af844c3dc?pvs=4"
            >
              Notion
            </Link>
            &nbsp;|&nbsp;
            <Link target="_blank" href="/">
              Medium
            </Link>
            &nbsp;|&nbsp;
            <Link target="_blank" href="/">
              Velog
            </Link>
            &nbsp;|&nbsp;
            <Link target="_blank" href="/">
              Github
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
