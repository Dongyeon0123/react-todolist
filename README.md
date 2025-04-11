# 📝 React Todo-List Mini Project

React를 공부하며 간단한 CRUD 기능 구현과 함께 `useState`, `useEffect`, `map()` 등의 문법을 연습하기 위해 Todo-List 프로젝트를 만들었습니다.

> 📚 **학습 목표**  
- React의 기초 개념 익히기  
- `useState`, `useEffect` 훅 사용  
- 배열과 객체 상태 관리  
- 조건부 렌더링 및 모달 구현  
- 마크업 및 간단한 스타일링

---

## 📸 미리보기

<img width="300" alt="Todo List UI" src="https://github.com/user-attachments/assets/633e13d1-02f8-4d28-8ca8-6fceee961a20" />

---

## 🔧 주요 기능

### ✅ 할 일 목록 표시
- 상단에 Todo List 제목과 함께 현재 등록된 할 일 개수(`array.length`)를 표시합니다.
- 리스트는 `map()`을 통해 반복 렌더링되며, 3개 이상일 경우 스크롤이 생성됩니다.

## 📂 프로젝트 구조
src/
├── App.js
├── components/
│   └── Modal.js
├── index.js
├── App.css
└── index.css



### 🆕 리스트 추가
- 제목과 메모를 입력 후 `업로드` 버튼 클릭 시 리스트가 추가됩니다.
- 빈 칸은 업로드되지 않도록 `trim()`으로 공백 처리합니다.

```jsx
let [제목, 제목변경] = useState(['할일 1', '할일 2']);
let [메모, 메모변경] = useState(['메모 1', '메모 2']);
let [제목입력값, 제목입력값변경] = useState('');
let [메모입력값, 메모입력값변경] = useState('');
let [체크상태, 체크상태변경] = useState([false, false]);

let addList = () => {
  if (제목입력값.trim() !== "" && 메모입력값.trim() !== "") {
    제목변경([...제목, 제목입력값]);
    메모변경([...메모, 메모입력값]);
    체크상태변경([...체크상태, false]); // 초기 체크 상태는 false
    제목입력값변경("");
    메모입력값변경("");
  }
};

### 📋 리스트 출력 및 체크 기능
- `map()`을 통해 리스트 출력
- 체크박스를 통해 완료 여부 토글
- 체크 시 회색 텍스트 + 취소선 스타일 적용

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

        <button
          className='modify-button'
          onClick={() => {
            수정인덱스변경(i);
            모달상태변경(true);
          }}
        >
          수정
        </button>

        <button
          className='delete-button'
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
          }}
        >
          삭제
        </button>
      </div>
    );
  })
}
```

---

### ✏️ 모달을 이용한 수정 기능
- 리스트의 `수정` 버튼 클릭 시 모달 팝업이 열립니다.
- 입력값 수정 후 `저장` 버튼을 누르면 해당 항목이 수정됩니다.

```jsx
{모달상태 === true ? (
  <div className="modal">
    <h4>할 일 수정하기</h4>
    <input
      type="text"
      value={수정제목}
      onChange={(e) => 수정제목변경(e.target.value)}
      placeholder="제목 수정"
    />
    <input
      type="text"
      value={수정메모}
      onChange={(e) => 수정메모변경(e.target.value)}
      placeholder="메모 수정"
    />
    <button
      onClick={() => {
        const 제목수정 = [...제목];
        const 메모수정 = [...메모];
        제목수정[수정인덱스] = 수정제목;
        메모수정[수정인덱스] = 수정메모;
        제목변경(제목수정);
        메모변경(메모수정);
        모달상태변경(false);
      }}
    >
      저장
    </button>
    <button onClick={() => 모달상태변경(false)}>취소</button>
  </div>
) : null}
```

## 🚧 향후 개선 계획

- [ ] 리스트 카테고리 기능 (예: 공부 / 운동 / 할 일)
- [ ] 체크 완료 항목 자동 하단 이동
- [ ] Firebase 또는 백엔드 연동
- [ ] 날짜별 필터 및 정렬 기능
