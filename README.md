# 📝 React Todo-List Mini Project

간단한 CRUD 기능 구현과 React의 `useState`, `useEffect`, 배열과 객체, `map()` 함수 등의 개념을 연습하기 위해 만든 미니 프로젝트이다. Todo-List는 가장 대표적인 입문 예제이며, React의 주요 개념을 손쉽게 익힐 수 있어 개발하게 되었다.

## 📸 Preview

<img width="300" alt="Todo Preview" src="https://github.com/user-attachments/assets/633e13d1-02f8-4d28-8ca8-6fceee961a20" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/b4402ce7-5642-446c-8317-9a83a863a374" />

## ⚙️ 주요 기능

- 할 일 추가 (제목 + 메모)
- 할 일 수정 (모달 창을 통한 편집)
- 할 일 삭제
- 체크박스를 통한 완료 상태 표시
- 스크롤 가능한 리스트 UI

## ✅ 할 일 목록 표시

상단에 Todo List 제목과 함께 현재 등록된 할 일 개수(array.length)를 표시.<br>
리스트는 map()을 통해 반복 렌더링되며, 3개 이상일 경우 스크롤이 생성된다.

## 🧠 사용한 기술

- React (CRA 환경)
- React Hooks (`useState`, `useEffect`)
- HTML / CSS
- JavaScript ES6+

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
제목과 메모를 입력하고 "업로드" 버튼을 누르면 새로운 리스트 항목이 추가된다.
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
수정 버튼을 누르면 해당 리스트 정보를 불러온 모달 창이 나타나며, 수정 완료 후 업로드를 누르면 리스트 내용이 업데이트가 된다.
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
🎯 배운 점

useState와 useEffect의 사용법
React의 기본 개념인 상태 관리, 렌더링 흐름 이해
배열 조작 (map, splice, spread operator)
컴포넌트 분리 및 props 활용
모달 구현 및 조건부 렌더링
체크 상태 시 스타일 동적 적용 (클래스 토글링)

## 🚧 향후 개선 계획

- [ ] 리스트 카테고리 기능 (예: 공부 / 운동 / 할 일)
- [ ] 체크 완료 항목 자동 하단 이동
- [ ] Firebase 또는 백엔드 연동
- [ ] 날짜별 필터 및 정렬 기능
