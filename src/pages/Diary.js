import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DiaryStateContext } from "../App"

import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion"

import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"


const Diary = () => {

  const { id } = useParams()
  // 전달 받은 id를 모아 객체로 반환
  const diaryList = useContext(DiaryStateContext)
  const navigate = useNavigate()
  const [data, setData] = useState()

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      )

      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary)

      } else {
        // 일기가 없을 때
        alert("존재하지 않는 일기에요.")
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryList, navigate])


  if (!data) {
    return <div className="DiaryPage">로딩 중입니다..</div>
  } else {

    const curEmotionDate = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    )
    console.log(curEmotionDate)

    return <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={
          <MyButton text={"<"} onClick={() => navigate(-1)}
          />
        }
        rightChild={
          <MyButton text={"수정"} onClick={() => navigate(`/edit/${data.id}`)}
          />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div className="diary_img_wrapper">
            <img src={curEmotionDate.emotion_img} alt="" />
            <div className="emotion_descript">
              {curEmotionDate.emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  }
}
export default Diary