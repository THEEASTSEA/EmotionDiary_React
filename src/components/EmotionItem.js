import React from "react";

const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
  // 함수는 기본적으로 컴포넌트 렌더링 시 재생성
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "emotion_item", isSelected ? `emotion_item_on_${emotion_id}` : `emotion_item_off`,
      ].join(" ")}
    >
      <img src={emotion_img} alt="" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
