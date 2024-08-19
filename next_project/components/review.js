import { useState, useContext } from "react";
// import { UserContext } from "../context/UserContext"; // 가정한 사용자 인증 컨텍스트
import styles from "./review.module.css"; // 스타일 시트 경로는 적절히 조정해주세요

function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  // const { user, isAuthenticated } = useContext(UserContext); // 사용자 인증 상태

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  // const postReview = () => {
  //   if (!isAuthenticated) {
  //     alert("로그인 후 리뷰를 작성할 수 있습니다.");
  //     return;
  //   }
  //   const review = {
  //     id: reviews.length + 1,
  //     text: newReview,
  //     userId: user.id,
  //   };
  //   setReviews([...reviews, review]);
  //   setNewReview("");
  // };

  const deleteReview = (reviewId) => {
    if (user.id === reviews.find((review) => review.id === reviewId).userId) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } else {
      alert("본인의 리뷰만 삭제할 수 있습니다.");
    }
  };

  return (
    <section className={styles.review}>
      <h3>
        <p>상품후기</p>
        <div>
          {" "}
          리뷰 (&nbsp;<span className={styles.reviewCount}>1</span>&nbsp;)
        </div>
      </h3>
      <div>
        <p className={styles.userId}>작성자 아이디 : cP_wer</p>
        <div>
          <textarea
            value={newReview}
            onChange={handleReviewChange}
            placeholder="리뷰를 입력해주세요"
          />
          {/* <button onClick={postReview}>등록</button> */}
          <button className={styles.submit}>등록하기</button>
        </div>
      </div>
      {reviews.map((review) => (
        <div className={styles.reviewCont} key={review.id}>
          <div className={reviewInfo}>
            <p className={styles.reviewrId}>{review.text}</p>
            {user.id === review.userId && (
              <button onClick={() => deleteReview(review.id)}>삭제</button>
            )}
          </div>
          <div className={styles.reviewDesc}>
            친구에게 선물하니 너무 좋아했어요
          </div>
        </div>
      ))}
      <div className={styles.reviewCont}>
        <div className={styles.reviewInfo}>
          <p className={styles.reviewrId}>
            <span>작성자 : </span>dust3456@gmail.com
          </p>
          <button>삭제</button>
        </div>
        <div className={styles.reviewDesc}>
          친구에게 선물하니 너무 좋아했어요
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
