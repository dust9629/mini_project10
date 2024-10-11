import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

function LikeButton({ userId, itemId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (userId && itemId) {
      const checkLikeStatus = async () => {
        try {
          const response = await axios.get(
            `/api/likes/status?userId=${userId}&itemId=${itemId}`
          );
          setLiked(response.data.liked);
        } catch (error) {
          console.error("Failed to fetch like status", error);
        }
      };
      checkLikeStatus();
    }
  }, [userId, itemId]);

  const toggleLike = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (liked) {
        await axios.delete("/api/likes", { data: { userId, itemId } });
      } else {
        await axios.post("/api/likes", { userId, itemId });
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  return (
    <Image
      src={liked ? "/images/icon_like_f.png" : "/images/icon_like_e.png"}
      alt="Like Icon"
      width={35}
      height={35}
      onClick={toggleLike}
      style={{ cursor: "pointer" }}
    />
  );
}

export default LikeButton;
