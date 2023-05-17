import React, { useReducer, useRef } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
      break
      // action.data 최신회된 데이터
      // state 기존 데이터
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it)
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id: 1,
    emotion: 5,
    content: "오늘의 첫번째 일기",
    date: 1684286612481
  },
  {
    id: 2,
    emotion: 4,
    content: "오늘의 두번째 일기",
    date: 1684286612482
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 세번째 일기",
    date: 1684286612483
  },
  {
    id: 4,
    emotion: 2,
    content: "오늘의 네번째 일기",
    date: 1684286612484
  },
  {
    id: 5,
    emotion: 1,
    content: "오늘의 다섯번째 일기",
    date: 1684286612485
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)
  // data(변수명), dispatch(상태변화함수), Reducer(어떻게변화할지결정), [](기본값-빈배열)

  const dataID = useRef(0);

  console.log(new Date().getTime())

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", // action.type
      data: {
        id: dataID.current,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    })
    dataID.current += 1
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId
    })
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/New' element={<New />} />
              <Route path='/Edit/:id' element={<Edit />} />
              <Route path='/Diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;







