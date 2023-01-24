# 할 일 관리 앱

## DEMO [todo overflow](https://todo-overflow.vercel.app/)

- api 활용 CRUD
- 기간: 1.17 - 1.24
- `HTML`, `SCSS`, `JS`
- `VITE`, `yarn`, `vercel`

## File Tree

- `public/*` - svg, png 관련 이미지 폴더
- `index.html` - main html
- `js/*` - main, api, handleLoding, dom
- `scss/*` - globals, layout, util 컴포넌트화, 최종 style.scss 로 forward

```
src/*

├── js
│   ├── api.js
│   ├── dom.js
│   ├── handleLoading.js
│   └── main.js *
└── scss
    ├── globals
    │   ├── _boilerplate.scss
    │   ├── _colors.scss
    │   ├── _index.scss
    │   └── _typography.scss
    ├── layout
    │   ├── _index.scss
    │   ├── layout.scss *
    │   └── loading.scss
    ├── style.scss
    └── util
        ├── _breakpoints.scss
        ├── _fonts.scss
        ├── _functions.scss
        └── _index.scss
```

## Overview

- [ ] 화면 렌더링 시 skeleton UI, cube Loading UI / api method 사용 시 Loading UI
- [ ] 할 일 CRUD 기능
- [ ] 할 일 수정 표시 UI
  - `contenteditable` 속성 활용. 수정 버튼 클릭 시 task title에 `focus()`, ‘저장’으로 text변경. 수정이 끝나고 저장 버튼 클릭 시 수정 완료 및 ‘수정’ text변경
- [ ] 할 일 완료 표시 토글 UI
  - ‘하는 중’버튼 클릭 시 ‘완료’로 text변경, ‘완료’ 버튼 클릭 시 ‘하는 중’으로 text변경
- [ ] 할 일 생성일, 수정일 표시
  - 할 일 수정 시 수정일 업데이트
- [ ] api fetch UI
  - api 요청 시 할 일 ‘추가’ 버튼 disabled
- [ ] api 메서드 분리로 재사용 고려(`api.js`)
- [ ] 할 일 CRUD 각각의 이벤트, 함수 분리로 유지보수 고려
- [ ] `let tasks = []` `render` 함수 사용으로 할 일 상태관리
- [ ] 총 메뉴 갯수 count 함수(updateTaskCount)사용, ‘할 일 전체’, ‘완료’, ‘하는 중’ 각각의 count를 브라우저 최상단에 display
- [ ] 완료한 task만 삭제할 수 있는 버튼

## Issues

- [ ] 완료/하는중 정렬 && 시간 순 정렬 동시 선택 시 오류 발생

## Running Locally

```
1. git clone https://github.com/jaehafe/KDT4-M3.git
2. cd KDT4-M3
3. yarn
4. .env 파일 생성 후, api key(base url, username, api key) 입력 ex) VITE_API_KEY=123456
5. yarn run dev
```

### 느낀점 && 개선할 점

- [ ] CRUD api 요청 시 다수의 렌더링 발생
- [ ] React로 변경해보기
