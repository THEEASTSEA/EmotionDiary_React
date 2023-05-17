import { useNavigate } from "react-router-dom"
import { useState, useRef, useContext, useEffect } from "react"

import MyHeader from "./MyHeader"
import MyButton from "./MyButton"
import EmotionItem from "./EmotionItem"
import { DiaryDispatchContext } from "../App"

import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion"

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ""



const DiaryEditor = ({ isEdit, orginData }) => {
  const [emotion, setEmotion] = useState(3)
  // 선택한 감정값 저장하는 State
  const [date, setDate] = useState(getStringDate(new Date()))
  // input 날짜 값을 저장하는 State
  const contentRef = useRef()
  const [content, setContent] = useState("")
  // 일기 내용 저장하는 state

  const handleClickEmote = (emotion) => {
    setEmotion(emotion)
  }

  const navigate = useNavigate()

  const { onCreate, onEdit } = useContext(DiaryDispatchContext)
  const handelSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus()
      return
    }

    if (window.confirm(isEdit ? "일기를 수정할까요?" : "새로운 일기를 작성할까요?")) {
      if (!isEdit) {
        onCreate(date, content, emotion)
      } else {
        onEdit(orginData.id, date, content, emotion)
      }
    }

    onCreate(date, content, emotion)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (isEdit) {// 현재 isEdit을 true일 때만 로직 동작
      setDate(getStringDate(new Date(parseInt(orginData.date))))
      setEmotion(orginData.emotion)
      setContent(orginData.content)
    }
  }, [isEdit, orginData])

  return <div className="DiaryEditor">
    <MyHeader headText={isEdit ? "일기 수정" : "일기 쓰기"} leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />} />

    <div>
      <section>
        <h4>오늘 날짜는?</h4>
        <div className="input_box">
          <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type="date" />
        </div>
      </section>
      <section>
        <h4>현재 기분은?</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id} {...it}
              onClick={handleClickEmote}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>내용</h4>
        <div className="input_box text_wrapper">
          <textarea
            placeholder="오늘 하루 어땠나요?"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={'취소'} onClick={() => navigate(-1)} />
          <MyButton text={'완료'} type={"positive"} onClick={handelSubmit} />
        </div>
      </section>
    </div>
  </div>
}

export default DiaryEditor