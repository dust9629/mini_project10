import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // useRouter를 import
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/footer.css";

function App({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 userRole 읽어오기
    const role = localStorage.getItem("userRole") || "";
    setUserRole(role);

    // 라우터 이벤트 핸들러
    const handleRouteChange = () => {
      const updatedRole = localStorage.getItem("userRole") || "";
      setUserRole(updatedRole);
    };

    // 라우트 변경 감지를 위해 이벤트 리스너 추가
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    router.push("/").then(() => window.location.reload()); // 페이지 이동 후 강제로 페이지를 리로드합니다.
  };

  // 라우트 변경 시 메뉴 상태 리셋
  useEffect(() => {
    setIsActive(false);
  }, [router.pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowTopBtn(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 네비게이션 메뉴 토글
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

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
            <Link href="/list">
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
              <p className="cart-count">4</p>
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
              <li>
                <Link href="/">브랜드 소개</Link>
              </li>
            </ul>
            <Link className="logout" href="/" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
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
              Tel: 010-8696-9388&nbsp;&nbsp;|&nbsp;&nbsp;Email:
              dust9629@gmail.com
            </p>
            <p>dust9629 all rights reserved</p>
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
            <Link target="_blank" href="https://medium.com/@dust9629">
              Medium
            </Link>
            &nbsp;|&nbsp;
            <Link target="_blank" href="https://velog.io/@dust9629/posts">
              Velog
            </Link>
            &nbsp;|&nbsp;
            <Link target="_blank" href="https://github.com/dust9629">
              Github
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
