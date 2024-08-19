import Link from "next/link";
import { useState } from "react";
import styles from "./../index.module.css";

export default function Join() {
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);

  const handleAddressSearch = () => {
    // 다음 우편번호 서비스를 호출하는 함수
    window.daum.postcode.load(function () {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 사용자가 검색 결과를 선택했을 때 실행되는 함수
          setZoneCode(data.zonecode); // 우편번호 (5자리 새우편번호 사용)
          setAddress(data.address); // 전체 주소
        },
      }).open();
    });
  };

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.divContainer}>
          <h3>회원가입</h3>
          <form>
            <div>
              <label htmlFor="join_email">이메일*</label>
              <input
                type="email"
                id="join_email"
                name="join_email"
                placeholder="이메일 주소를 입력하세요"
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_password">비밀번호*</label>
              <input
                type="password"
                id="join_password"
                name="join_password"
                placeholder="비밀번호 입력"
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_password_confirm">비밀번호 확인*</label>
              <input
                type="password"
                id="join_password_confirm"
                name="join_password_confirm"
                placeholder="비밀번호 재입력"
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_name">이름*</label>
              <input
                type="text"
                id="join_name"
                name="join_name"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_phone">휴대폰 번호*</label>
              <input
                type="tel"
                id="join_phone"
                name="join_phone"
                placeholder="휴대폰 번호 입력"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="join_address">주소*</label>
              <span className={styles.addressWrap}>
                <input
                  type="text"
                  id="join_zonecode"
                  name="join_zonecode"
                  placeholder="우편번호"
                  value={zoneCode}
                  readOnly
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className={styles.addressButton}
                >
                  주소 검색
                </button>
              </span>
              <input
                type="text"
                id="join_address01"
                name="join_address01"
                placeholder="주소 입력"
                value={address}
                readOnly
                required
                className={styles.inputField}
              />
              <input
                type="text"
                id="join_address02"
                name="join_address02"
                placeholder="상세 주소 입력"
                value=""
                readOnly
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.agreement}>
              <h3 className={styles.agreementTit}>
                이용약관 및 개인정보 처리방침
              </h3>
              <h5 className={styles.agreeTit}>
                <input
                  type="checkbox"
                  id="agree_terms_1"
                  checked={agreeTerms1}
                  onChange={(e) => setAgreeTerms1(e.target.checked)}
                />
                <label htmlFor="agree_terms_1">[필수] 이용약관 동의</label>
              </h5>
              <div className={styles.agreeConts}>
                <p>
                  제 1장 총 칙 제 1조 (목적)
                  <br /> 본 이용약관은 주식회사 프린트베이커리(이하 “회사”)가
                  사이버 몰 (이하 “몰”이라 한다)에서 제공하는 모든 서비스(이하
                  "서비스")를 이용함에 있어 "회사"와 이용자의 권리·의무 및
                  책임사항을 규정함을 목적으로 합니다. PC통신, 무선 등을
                  이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이
                  약관을 준용합니다. 제 2조 (정의) 1. "몰"이란 "회사"가 재화
                  또는 용역(이하 "재화 등")을 이용자에게 제공하기 위하여 컴퓨터
                  등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정한
                  가상의 영업장을 말하며, 아울러 사이버 몰을 운영하는 사업자의
                  의미로도 사용합니다.
                  <br />
                  <br /> 2. "이용자"란 “몰”에 접속하여 이 약관에 따라 "회사"가
                  제공하는 "서비스"를 받는 회원 및 비회원을 말합니다. <br />
                  <br />
                  3. "회원"이라 함은 "회사"에 개인정보를 제공하여 회원 등록을 한
                  자로서, "회사"의 정보를 지속적으로 제공 받으며, "회사"가
                  제공하는 "서비스"를 계속적으로 이용할 수 있는 자를 말합니다.{" "}
                  <br />
                  <br />
                  4. "비회원"이라 함은 회원에 가입하지 않고 "회사"가 제공하는
                  "서비스"를 이용하는 자를 말합니다. <br />
                  <br />
                  5. 이외에 이 약관에서 사용하는 용어의 정의는 관계 법령 및
                  "서비스" 별 안내에서 정하는 바에 의합니다. 제 3조 (약관 등의
                  명시와 설명 및 개정) <br />
                  <br />
                  1. "회사"는 이 약관의 내용과 상호, 영업소 소재지 주소(소비자의
                  불만을 처리할 수 있는 곳의 주소를 포함), 전화번호,
                  모사전송번호, 이메일 주소, 사업자등록번호, 통신판매업신고번호,
                  개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 “몰”의 초기
                  "서비스"화면에 게시합니다. 다만, 약관의 내용은 이용자가
                  연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                  <br />
                  <br /> 2. "회사"는 『약관의 규제에 관한 법률』, 『정보통신망
                  이용촉진 및 정보보호 등에 관한 법률』, 『전자상거래 등에서의
                  소비자보호에 관한 법률』, 『소비자기본법』 등 관련법을
                  위배하지 않는 범위 에서 이 약관을 개정할 수 있습니다. <br />
                  <br />
                  3. "회사"는 약관을 개정할 경우에는 적용일자 및 개정사유를
                  명시하여 현행약관과 "회사"의 화면에 그 적용일자 7일 이전부터
                  적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
                  약관내용을 변경하는 경우에는 최소한 30일 이상의 사전
                  유예기간을 두고 공지합니다. 이 경우 "회사"는 개정 전 내용과
                  개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록
                  표시합니다. <br />
                  <br />
                  4. "회사"가 약관을 개정할 경우에는 그 개정약관은 그 적용일자
                  이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에
                  대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미
                  계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는
                  뜻을 제4항에 의한 개정약관의 공지기간 내에 "회사"에 송신하여
                  "회사"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.{" "}
                  <br />
                  <br />
                  5. 이 약관에서 정하지 아니한 내용과 이 약관의 해석에 관하여는
                  『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의
                  규제에 관한 법률』, 공정거래위원회가 정하는 『전자상거래
                  등에서의 소비자보호지침』 및 관계법령 또는 상관례에 따릅니다.
                  <br />
                  <br />
                  <br />
                  현재 이용약관 고지일자 : 2024년 08월 12일
                </p>
              </div>
            </div>
            <div className={styles.agreement}>
              <h5 className={styles.agreeTit}>
                <input
                  type="checkbox"
                  id="agree_terms_2"
                  checked={agreeTerms2}
                  onChange={(e) => setAgreeTerms2(e.target.checked)}
                />
                <label htmlFor="agree_terms_2">
                  [필수] 개인정보 처리방침 동의
                </label>
              </h5>
              <div className={styles.agreeConts}>
                <p>
                  ■ 수집하는 개인정보 항목 회사는 회원가입, 상담, 서비스 신청
                  등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                  <br />
                  <br /> ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID ,
                  비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 ,
                  휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 ,
                  회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 ,
                  서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                  <br />
                  <br /> ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식 ■
                  개인정보의 수집 및 이용목적 회사는 수집한 개인정보를 다음의
                  목적을 위해 활용합니다. <br />
                  <br />ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른
                  요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는
                  청구지 등 발송 <br />
                  <br />ο 회원 관리 회원제 서비스 이용에 따른 본인확인 , 개인
                  식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정
                  대리인 동의여부 확인 , 고지사항 전달 <br />
                  <br />ο 마케팅 및 광고에 활용 접속 빈도 파악 또는 회원의
                  서비스 이용에 대한 통계 <br />■ 개인정보의 보유 및 이용기간
                  회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이
                  해당 정보를 지체 없이 파기합니다.
                </p>
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>
              회원가입
            </button>

            <div className={styles.linkGroup}>
              <Link href="/member">로그인 페이지로 이동</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
