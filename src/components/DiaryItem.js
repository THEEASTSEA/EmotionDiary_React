import { useNavigate } from "react-router-dom"
import MyButton from "./MyButton"


const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate()
  const env = process.env
  env.PUBLIC_URL = env.PUBLIC_URL || ""

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${id}`)
  }

  const strDate = new Date(parseInt(date)).toLocaleDateString()

  return <div className="DiaryItem">
    <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
      <img src={process.env.PUBLIC_URL + `assets/${emotion}.png`} />
    </div>
    <div onClick={goDetail} className="info_wrapper">
      <div className="diary_date">{strDate}</div>
      <div className="diary_content_perview">
        {content.slice(0, 25)}
      </div>
    </div>
    <div className="btn_wrapper">
      <MyButton onClick={goEdit} text={"수정"} />
    </div>

  </div>
}

export default DiaryItem