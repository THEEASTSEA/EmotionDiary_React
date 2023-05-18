import DiaryEditor from "../components/DiaryEditor"
import { useEffect } from "react"

// const getStringDate = (date) => {
//   return date.toISOString().slice(0, 10)
//   // ISO 형식의 문자열을 반환, YYYY-MM-DDTHH...
// }

const New = () => {

  useEffect(() => {
    const titleEl = document.getElementsByTagName('title')[0]
    // 문서에서 타이틀 객체를 모두 가져오기(배열))
    titleEl.innerHTML = `감정 일기장 - 새 일기 쓰기`
  }, [])

  return <div>
    <DiaryEditor />
  </div>
}

export default New