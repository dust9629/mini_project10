import React, { useState, useEffect } from "react";
import styles from "./popup.module.css"; // CSS 모듈 가져오기
import Link from "next/link";

const EventPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const dontShow = localStorage.getItem("dontShowDate");

    if (dontShow !== today) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      const today = new Date().toLocaleDateString();
      localStorage.setItem("dontShowDate", today);
    }
    setIsVisible(false);
  };

  const handleCheckboxChange = () => {
    setDontShowToday(!dontShowToday);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupContainer}>
      <Link
        href="https://pricey-sing-49c.notion.site/Boodle-507fc2ff90f546bfb24c5c386d6720ac?pvs=4"
        target="_blank"
      >
        <p className={styles.popupText}>
          첫 방문 특별 이벤트!
          <br />
          부들의 혜택을 확인하세요!
        </p>
      </Link>
      <div className="btn-wrap">
        <p>
          <input
            type="checkbox"
            checked={dontShowToday}
            onChange={handleCheckboxChange}
            id="dontShowTodayCheckbox"
            className={styles.popupCheckbox}
          />
          <label htmlFor="dontShowTodayCheckbox">오늘 하루 그만보기</label>
        </p>
        <button onClick={handleClose} className={styles.popupButton}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default EventPopup;
