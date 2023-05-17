import { useState } from "react"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" }
]
const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "나쁜 감정" }
]


const ControlMenu = ({ value, onChange, optionList }) => {
  // value 선택한 값, onChange 선택 값이 변경, 옵션(선택 리스트)
  return (<select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
    {optionList.map((it, idx) => (
      <option key={idx} value={it.value}>
        {it.name}
      </option>
    ))}
  </select>
  )
}

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate()

  // State
  const [sortType, setSortType] = useState('lastest')
  const [filter, setFilter] = useState('all')


  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3
      } else {
        return parseInt(item.emotion) > 3
      }
    }

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date)
      } else {
        return parseInt(a.date) - parseInt(b.date)
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList))
    // 원본 데이터의 값이 Json변환 후 배열로 생성

    const failteredList = filter == 'all' ? copyList : copyList.filter((it) => filterCallback(it))

    const sortedList = failteredList.sort(compare)
    return sortedList
  };

  console.log("diary:", diaryList)

  return <div className="DiaryList">
    <div className="menu_wrapper">
      <div className="left_col">
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
        <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
      </div>
      <div className="right_col">
        <MyButton type={'positive'} text={'일기쓰기'} onClick={() => navigate('/new')} />
      </div>
    </div>
    {getProcessedDiaryList().map((it) => (
      <DiaryItem key={it.id} {...it} />
    ))}
  </div >
}

DiaryList.defaultProps = {
  diaryList: []
}

export default DiaryList