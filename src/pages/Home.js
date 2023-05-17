import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App"
import MyHeader from "./../components/MyHeader"
import Mybutton from "./../components/MyButton"
import DiaryList from "./../components/DiaryList"



const Home = () => {
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date())
  console.log(curDate)

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 // 첫번째 날짜
      ).getTime()

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0 // 마지막 날짜
      )

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      )
    }
  }, [diaryList, curDate])

  useEffect(() => {
    console.log(data)
  }, [data])


  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    )
  }

  const decreseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  }

  return <div>
    <MyHeader headText={headText}
      leftChild={<Mybutton text={"<"} onClick={decreseMonth} />}
      rightChild={<Mybutton text={">"} onClick={increaseMonth} />}
    />
    <DiaryList diaryList={data} />
  </div>
}

export default Home