import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [리스트제목, 리스트제목변경] = useState(['할일 1', '할일 2', '할일 3']);
  let [메모, 메모변경] = useState(['메모 1', '메모 2', '메모 3']);
  let [입력값, 입력값변경] = useState('');

  let addList = () => {
    if (입력값.trim() !== "") {
      리스트제목변경([...리스트제목, 입력값]);
      입력값변경 ("");
    }
  }

  return (
    <div className='App'>
      <div className='title-box'>
        <h1 className='title'>Todo List</h1>
        <p className='title-content'>개의 할 일이 있습니다.</p>
      </div>
      <div className='list'>
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
      </div>
      <div className='input-box'>
        <h3>해야할 일을 입력하세요.</h3>
        <input type="text" className='todo-box' placeholder='todo List 작성'/>
        <input type="text" className='todo-box2' placeholder='메모'/>
        <button className='upload'
        onClick={addList}>업로드</button>
      </div>
    </div>
  )
}

export default App