const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "emotion_item", isSelected ? `emotion_item_on_${emotion_id}` : `emotion_item_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
