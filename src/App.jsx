import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [제목, 제목변경] = useState(['할일 1', '할일 2']);
  let [메모, 메모변경] = useState(['메모 1', '메모 2']);
  let [제목입력값, 제목입력값변경] = useState('');
  let [메모입력값, 메모입력값변경] = useState('');

  let addList = () => {
    if (제목입력값.trim() !== "" && 메모입력값.trim() !== "") {
      제목변경([...제목, 제목입력값]);
      메모변경([...메모, 메모입력값]);
      제목입력값변경 ("");
      메모입력값변경 ("");
    }
  }

  return (
    <div className='App'>
      <div className='title-box'>
        <h1 className='title'>Todo List</h1>
        <p className='title-content'>{제목.length}개의 할 일이 있습니다.</p>
      </div>
      {
        제목.map(function(a, i){
          return (
            <div className='list' key={i}>
              <h3>{제목[i]}</h3>
              <p>{메모[i]}</p>
              <button className='delete-button'
              onClick={() => {
                let copy제목 = [...제목];
                let copy메모 = [...메모];

                copy제목.splice(i, 1);
                copy메모.splice(i, 1);

                제목변경(copy제목);
                메모변경(copy메모);
              }}>삭제</button>
            </div>
          )
        })
      }
      {/* <div className='list'>
        <h3>{리스트제목[0]}</h3>
        <p>{메모[0]}</p>
        <button className='delete-button'>삭제</button>
      </div>
      <div className='list'>
        <h3>{리스트제목[1]}</h3>
        <p>{메모[1]}</p>
        <button className='delete-button'>삭제</button>
      </div>
      <div className='list'>
        <h3>{리스트제목[2]}</h3>
        <p>{메모[2]}</p>
        <button className='delete-button'>삭제</button>
      </div> */}
      <div className='input-box'>
        <h3>해야할 일을 입력하세요.</h3>
        <input type="text" className='todo-box' placeholder='todo List 작성'
        onChange = {(e) => {제목입력값변경(e.target.value); }} />
        <input type="text" className='todo-box2' placeholder='메모' 
        onChange = {(e) => {메모입력값변경(e.target.value); }}/>
        <button className='upload'
        onClick={addList}>업로드</button>
      </div>
    </div>
  )
}

export default App