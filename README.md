# 📝 React Todo-List Mini Project

React의 기본 개념들을 직접 다뤄보며 익히기 위해 Todo List 미니 프로젝트를 만들어보았다.<br>
`useState`, `useEffect`, 배열과 객체 조작, `map()` 함수 등을 활용해서 CRUD 기능을 구현해보는 게 이번 목표이기 때문이다.  
Todo 앱은 입문자에게 가장 친숙한 예제 중 하나라, 나를 포함한 React를 처음 배우는 분들께도 추천하고 싶은 주제이다.

## 📸 Preview

<img width="400" alt="Todo Preview" src="https://github.com/user-attachments/assets/633e13d1-02f8-4d28-8ca8-6fceee961a20" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/b4402ce7-5642-446c-8317-9a83a863a374" />

## 📸 프로젝트 시연
<img src="https://github.com/user-attachments/assets/eb78be07-80ce-4c7c-b769-aaad8e8821bb" width="500"/>

## ⚙️ 주요 기능

✅ 할 일 추가 (제목 + 메모)<br>
✏️ 할 일 수정 (모달 창 활용)<br>
❌ 할 일 삭제<br>
☑️ 완료 상태 체크 (체크박스)<br>
📜 스크롤 가능한 리스트 UI<br>

## ✅ 할 일 목록 표시

상단에 Todo List 제목과 함께 현재 등록된 할 일 개수(array.length)를 표시.<br>
리스트는 `map()`을 통해 반복적으로 렌더링되며, 항목이 3개 이상이 될 경우, 스크롤이 자동 생성되도록 구성했다.<br>
상단에는 현재 등록된 할 일의 개수를 실시간으로 표시해서 사용자가 진행 상황을 바로 확인할 수 있도록 했다.

## 🧠 사용한 기술

- React (CRA 환경)
- React Hooks (`useState`, `useEffect`)
- HTML / CSS
- JavaScript ES6+

## 📁 디렉토리 구조

src/<br>
├── App.jsx // 메인 컴포넌트<br>
├── App.css // App 스타일 파일<br>
├── main.jsx // React 앱 엔트리 포인트<br>
└── index.css // 전역 스타일 시트

---

## 🖥️ UI 구성 설명

### ✅ 타이틀 영역

할 일 목록의 총 개수를 실시간으로 표시.

```jsx
<div className='title-box'>
  <h1 className='title'>Todo List</h1>
  <p className='title-content'>{제목.length}개의 할 일이 있습니다.</p>
</div>
```
📋 리스트 출력 및 체크 기능
map() 함수를 활용하여 리스트를 반복 출력하며, 체크박스를 통해 완료 표시를 할 수 있다. 체크된 항목은 회색 글씨와 가로줄이 생기도록 스타일링을 하였다.
```jsx
{
  제목.map((a, i) => {
    return (
      <div className='list' key={i}>
        <div className='list-header'>
          <input
            type='checkbox'
            checked={체크상태[i]}
            onChange={() => {
              const newCheck = [...체크상태];
              newCheck[i] = !newCheck[i];
              체크상태변경(newCheck);
            }}
          />
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
```
➕ 리스트 추가 기능
제목과 메모를 입력한 뒤 "업로드" 버튼을 누르면 새로운 할 일 항목이 리스트에 추가된다.
입력값은 빈 문자열 여부를 체크해서 유효한 경우에만 추가되도록 처리했다.
초기값도 간단하게 `useState`로 관리를 했다.

```jsx
<div className='input-box'>
  <h3>해야할 일을 입력하세요.</h3>
  <input
    type="text"
    className='todo-box'
    placeholder='todo List 작성'
    value={제목입력값}
    onChange={(e) => 제목입력값변경(e.target.value)}
  />
  <input
    type="text"
    className='todo-box'
    placeholder='메모 작성'
    value={메모입력값}
    onChange={(e) => 메모입력값변경(e.target.value)}
  />
  <button className='upload-button' onClick={addList}>업로드</button>
</div>
추가 함수:

let addList = () => {
  if (제목입력값.trim() !== "" && 메모입력값.trim() !== "") {
    제목변경([...제목, 제목입력값]);
    메모변경([...메모, 메모입력값]);
    체크상태변경([...체크상태, false]);
    제목입력값변경("");
    메모입력값변경("");
  }
}
```
🛠️ 수정 기능 (모달)
"수정" 버튼을 클릭하면 해당 항목의 정보를 담은 모달이 열리게 되고, 내용을 편집한 뒤 "업로드"를 누르면 리스트가 업데이트된다.
모달은 별도 컴포넌트로 분리해서 조건부 렌더링으로 표시되며, `props`를 통해 필요한 상태값과 함수들을 주고받도록 했다.
```jsx
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
```
모달 컴포넌트:
```jsx
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
      <button className="modify-upload" onClick={handleUpload}>업로드</button>
      <button onClick={closeModal} className="modal-close">닫기</button>
    </div>
  );
}
```
🧪 상태 관리 (State)

아래는 프로젝트 전반에 사용된 useState 목록
```jsx
let [제목, 제목변경] = useState(['할일 1', '할일 2']);
let [메모, 메모변경] = useState(['메모 1', '메모 2']);
let [제목입력값, 제목입력값변경] = useState('');
let [메모입력값, 메모입력값변경] = useState('');
let [체크상태, 체크상태변경] = useState([false, false]);
let [모달, 모달상태변경] = useState(false);
let [수정인덱스, 수정인덱스변경] = useState(null);
```

아래는 주석이 추가된 css코드이다.
```css
/* App.css */

/* 전체 앱 박스 */
.App {
  margin: auto;
  margin-top: 80px;
  border: 3px solid #000;
  width: 70%;
  height: 900px;
  border-radius: 15px;
  background-color: #ffe0e0; /* 연한 파스텔 핑크 */
  position: relative;
}

/* 타이틀 */
.title {
  text-align: center;
  margin-top: 30px;
}

/* 타이틀 하단 내용 */
.title-content {
  text-align: center;
}

/* 개별 투두 리스트 박스 */
.list {
  border: 1px solid #f3d1d1;
  border-radius: 15px;
  width: 80%;
  margin: auto;
  background-color: #fff3f3; /* 부드러운 크림핑크 */
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
}

/* 리스트 상단 (체크박스, 텍스트 등) */
.list-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 완료된 항목 스타일 */
.done {
  text-decoration: line-through;
  color: gray;
}

/* 수정 버튼 */
.modify-button {
  position: absolute;
  right: 10px;
  bottom: 60px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 60px;
  background-color: #9aa2ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modify-button:hover {
  background-color: #747bc5;
}

.modify-button:focus {
  background-color: #595e94;
}

/* 삭제 버튼 */
.delete-button {
  position: absolute;
  right: 10px;
  bottom: 15px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 60px;
  background-color: #ff9aa2; /* 산뜻한 핑크 */
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #e07a86;
}

.delete-button:focus {
  background-color: #c25a67;
}

/* 입력창 박스 (하단 고정) */
.input-box {
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #fffafc;
  padding: 20px;
  width: 80%;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* 텍스트 입력 필드 */
.todo-box {
  width: 80%;
  padding: 15px 20px;
  border-radius: 15px;
  border: 2px solid #d3cfcf;
  background-color: #fff;
  transition: background-color 0.2s, border-color 0.2s;
}

/* 포커스 스타일 */
.todo-box:focus,
.todo-box2:focus {
  background-color: #f6f0f0;
  border-color: #a9a4a4;
  outline: none;
}

/* 업로드 버튼 */
.upload-button {
  width: 80%;
  padding: 15px;
  border-radius: 15px;
  background-color: #b5ead7; /* 파스텔 민트 */
  color: #333;
  border: none;
  font-weight: bold;
  transition: background-color 0.2s;
  cursor: pointer;
}

.upload-button:hover {
  background-color: #88d9c0;
}

.upload-button:focus {
  background-color: #5fae97;
}

/* 모달창 */
.modal {
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #fffafc;
  padding: 20px;
  width: 80%;
  position: absolute;
  bottom: 300px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1000;
}

/* 모달 보여줄 때 */
.modal.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

/* 모달 뒷배경 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
  z-index: 999; /* 모달보다 약간 낮게 */
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* 오버레이 활성화 시 */
.overlay.show {
  opacity: 1;
  pointer-events: auto;
}

/* 수정 입력창 */
.modify-box {
  width: 80%;
  padding: 15px 20px;
  border-radius: 15px;
  border: 2px solid #d3cfcf;
  background-color: #fff;
  transition: background-color 0.2s, border-color 0.2s;
}

.modify-box:focus {
  background-color: #f6f0f0;
  border-color: #a9a4a4;
  outline: none;
}

/* 수정 업로드 버튼 */
.modify-upload {
  width: 80%;
  padding: 15px;
  border-radius: 15px;
  background-color: #b5ead7; /* 파스텔 민트 */
  color: #333;
  border: none;
  font-weight: bold;
  transition: background-color 0.2s;
  cursor: pointer;
}

.modify-upload:hover {
  background-color: #88d9c0;
}

.modify-upload:focus {
  background-color: #5fae97;
}

/* 모달 닫기 버튼 */
.modal-close {
  background-color: #ff9aa2;
  border: none;
  padding: 10px;
  border-radius: 10px;
  width: 60px;
  color: white;
  cursor: pointer;
}

.modal-close:hover {
  background-color: #e07a86;
}

.modal-close:focus {
  background-color: #c25a67;
}

/* 리스트 스크롤 영역 */
.list-container {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

/* 커스텀 스크롤바 스타일 */
.list-container::-webkit-scrollbar {
  width: 8px;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
```

🎯 배운 점

useState와 useEffect의 사용법
React의 기본 개념인 상태 관리와 렌더링 흐름에 대한 이해
배열 조작 (map, splice, spread operator)
컴포넌트 분리 및 props 활용
모달 구현 및 조건부 렌더링
체크 상태 시 스타일 동적 적용 (클래스 토글링)

이 프로젝트를 통해 React의 상태 관리 흐름을 더 명확히 이해할 수 있었다. 
또, 배열을 다루는 다양한 방법들과 컴포넌트 분리, props 전달 방식 등 실무에서도 자주 쓰일 개념들을 연습할 수 있어서 좋았고,
모달 구현이나 조건부 렌더링 같은 UI 인터랙션 처리도 좋은 경험이 되었던 것 같다.


## 🚧 향후 개선 계획

- [ ] 리스트 카테고리 기능 (예: 공부 / 운동 / 할 일)
- [ ] 체크 완료 항목 자동 하단 이동
- [ ] Firebase 또는 백엔드 연동
- [ ] 날짜별 필터 및 정렬 기능
