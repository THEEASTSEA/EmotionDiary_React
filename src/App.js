import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New'; // Potential typo: Should be './pages/New'
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT':
      return action.data; // action.data 최신회된 데이터, state 기존 데이터
    case 'CREATE':
      newState = [action.data, ...state];
      break;
    case 'REMOVE':
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    case 'EDIT':
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      if (diaryList.length > 0) {
        dataID.current = parseInt(diaryList[0].id) + 1;
      }
      dispatch({ type: 'INIT', data: diaryList });
    }

  }, []);

  const [data, dispatch] = useReducer(reducer, []);
  const dataID = useRef(0);

  console.log(new Date().getTime());

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataID.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataID.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/New" element={<New />} />
              <Route path="/Edit/:id" element={<Edit />} />
              <Route path="/Diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
