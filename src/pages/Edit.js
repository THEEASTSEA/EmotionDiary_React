import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DiaryStateContext } from "../App"
import { useEffect } from "react"
import DiaryEditor from "../components/DiaryEditor"
import { useState } from "react"

const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // 현재 id 불러오기
  const [orginData, setOriginData] = useState()

  const diaryList = useContext(DiaryStateContext)
  console.log(id)
  console.log(diaryList)

  useEffect(() => {
    const titleEl = document.getElementsByTagName('title')[0]
    // 문서에서 타이틀 객체를 모두 가져오기(배열))
    titleEl.innerHTML = `감정 일기장 - ${id}번 일기 수정`
  }, [id])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      )
      console.log(targetDiary)
      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        alert("존재하지 않는 일기에요.")
        navigate("/", { replace: true })
        // id 값이 없을 경우 강제로 홈으로 이동, 뒤로가기 방지
      }
    }
  }, [id, diaryList, navigate])
  // 컴포넌트가 마운트 되었을 때, 다이어리 리스트에서
  // 현재 Id 값에 맞는 데이터 불러오기

  return <div>
    {orginData && <DiaryEditor isEdit={true} orginData={orginData} />}
  </div>
}

export default Edit


  // useSearchParams를 통해 쿼리 스트링 처리, 배열을 반환
  // setSearchParams를 통해 쿼리 데이터 변경 가능
  // http://localhost:3000/edit?id=1999&mode=dark
  // const [searchParams, setSearchParams] = useSearchParams()
  // const id = searchParams.get('id')
  // console.log("id : ", id) // 1999
  // const mode = searchParams.get('mode')
  // console.log("mode : ", mode) // dark

  // useNavigate는 페이지를 이동할 수 있는 함수를 반환
  // navigate("경로")
  // 의도적으로 페이지를 변경할 때 사용