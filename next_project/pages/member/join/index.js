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
              <input
                type="text"
                id="join_address"
                name="join_address"
                placeholder="주소 입력"
                value={address}
                readOnly
                required
                className={styles.inputField}
              />
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
            </div>
            <div>
              <h5>
                <input
                  type="checkbox"
                  id="agree_terms_1"
                  checked={agreeTerms1}
                  onChange={(e) => setAgreeTerms1(e.target.checked)}
                />
                <label htmlFor="agree_terms_1">[필수] 이용약관 동의</label>
              </h5>
              <div className={styles.agreeConts}>
                <p>내용</p>
              </div>
            </div>
            <div>
              <h5>
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
                <p>내용</p>
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
