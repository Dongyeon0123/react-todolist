import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [제목, 제목변경] = useState(['할일 1', '할일 2']);
  let [메모, 메모변경] = useState(['메모 1', '메모 2']);
  let [제목입력값, 제목입력값변경] = useState('');
  let [메모입력값, 메모입력값변경] = useState('');
  let [체크상태, 체크상태변경] = useState([false, false]);
  let [모달, 모달상태변경] = useState(false);
  let [수정인덱스, 수정인덱스변경] = useState(null);

  let addList = () => {
    if (제목입력값.trim() !== "" && 메모입력값.trim() !== "") {
      제목변경([...제목, 제목입력값]);
      메모변경([...메모, 메모입력값]);
      체크상태변경([...체크상태, false]); // 추가된 항목은 처음엔 체크 안됨
      제목입력값변경("");
      메모입력값변경("");
    }
  }

  return (
    <div className='App'>
      <div className='title-box'>
        <h1 className='title'>Todo List</h1>
        <p className='title-content'>{제목.length}개의 할 일이 있습니다.</p>
      </div>
      <div className='list-container'>
      {
        제목.map(function(a, i){
          return (
            <div className='list' key={i}>
              <div className='list-header'>
                <input type='checkbox'
                  checked={체크상태[i]}
                  onChange={() => {
                    const newCheck = [...체크상태];
                    newCheck[i] = !newCheck[i];
                    체크상태변경(newCheck);
                  }} />
                <h3 className={체크상태[i] ? 'done' : ''}>{제목[i]}</h3>
              </div>
              <p className={체크상태[i] ? 'done' : ''}>{메모[i]}</p>
              <button className='modify-button'
                onClick={() => {
                  수정인덱스변경(i);
                  모달상태변경(true);
              }}>수정</button>
              <button className='delete-button'
              onClick={() => {
                let copy제목 = [...제목];
                let copy메모 = [...메모];
                let copy체크 = [...체크상태];

                copy제목.splice(i, 1);
                copy메모.splice(i, 1);
                copy체크.splice(i, 1);

                제목변경(copy제목);
                메모변경(copy메모);
                체크상태변경(copy체크);
              }}>삭제</button>
            </div>
          )
        })
      }
      </div>
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
        value={제목입력값}
        onChange = {(e) => {제목입력값변경(e.target.value); }} />
        <input type="text" className='todo-box' placeholder='메모 작성' 
        value={메모입력값}
        onChange = {(e) => {메모입력값변경(e.target.value); }}/>
        <button className='upload-button'
        onClick={addList}>업로드</button>
      </div>

      {모달 && (
        <>
          <div className="overlay show" onClick={() => 모달상태변경(false)}></div>
          <Modal 
          closeModal={() => 모달상태변경(false)} 
          제목={제목}
          메모={메모}
          수정인덱스={수정인덱스}
          제목변경={제목변경}
          메모변경={메모변경}
        />
        </>
      )}
    </div>
    
  )
}

function Modal({ closeModal, 제목, 메모, 수정인덱스, 제목변경, 메모변경 }) {
  const [수정제목, 수정제목변경] = useState('');
  const [수정메모, 수정메모변경] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (수정인덱스 !== null) {
      수정제목변경(제목[수정인덱스]);
      수정메모변경(메모[수정인덱스]);
    }
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, [수정인덱스]);

  const handleUpload = () => {
    const 새로운제목 = [...제목];
    const 새로운메모 = [...메모];

    새로운제목[수정인덱스] = 수정제목;
    새로운메모[수정인덱스] = 수정메모;

    제목변경(새로운제목);
    메모변경(새로운메모);
    closeModal();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <h4>리스트 수정하기</h4>
      <input
        type="text"
        className="modify-box"
        placeholder="수정할 todo List 제목"
        value={수정제목}
        onChange={(e) => 수정제목변경(e.target.value)}
      />
      <input
        type="text"
        className="modify-box"
        placeholder="수정할 메모"
        value={수정메모}
        onChange={(e) => 수정메모변경(e.target.value)}
      />
      <button className="modify-upload" onClick={handleUpload}>
        업로드
      </button>
      <button onClick={closeModal} className="modal-close">
        닫기
      </button>
    </div>
  );
}


export default App