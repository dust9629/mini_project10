import Link from "next/link";
import styles from "./../index.module.css"; // CSS 모듈 임포트

export default function nonmember() {
  return (
    <main>
      <section>
        <div className={styles.divContainer}>
          <div className={styles.prdTxt}>
            <h3>비회원 주문조회</h3>
            <form>
              <div>
                <label htmlFor="find_id_names">이름</label>
                <input
                  type="text"
                  id="find_id_names"
                  name="find_id_names"
                  placeholder="이름을 입력하세요"
                  required
                  className={styles.inputField}
                />
              </div>
              <div>
                <label htmlFor="find_id_nums">휴대폰 번호</label>
                <input
                  type="text"
                  id="find_id_nums"
                  name="find_id_nums"
                  placeholder="휴대폰 번호를 입력하세요"
                  required
                  className={styles.inputField}
                />
              </div>
              <button type="submit" className={styles.nonmemberButton}>
                주문 조회하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
