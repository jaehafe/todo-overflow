import '../scss/style.scss';

const $ = (selector) => document.querySelector(selector);

function App() {
  // todo 갯수 업데이트
  const updateToDoCount = () => {
    const todoTotalCount = $('.main__todo').querySelectorAll('li').length;
    $('.todo-total-count').innerHTML = `총 ${todoTotalCount}개`;
  };
  // todo list 추가
  const addTodo = () => {
    const todo = $('.main__input-text').value;
    const todoTemplate = (todo) => {
      return `
        <li class="main__todo-list" id="todo-id">
          <div class="main__todo-list--title-container">
            <span class="main__todo-list--date">12-15</span>
            <span class="main__todo-list--title"
              >${todo}</span
            >
          </div>
          <div class="main__todo-list--btn-container">
            <button class="main__todo-list--done-btn btn">완료</button>
            <button class="main__todo-list--edit-btn btn">수정</button>
            <button class="main__todo-list--delete-btn btn">삭제</button>
          </div>
        </li>`;
    };
    $('.main__todo').insertAdjacentHTML('afterbegin', todoTemplate(todo));
    updateToDoCount();
    $('.main__input-text').value = '';
  };

  // form 태그 새로고침 방지
  $('.main__input-container').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // $('#todo-add-btn').addEventListener('click', () => {
  //   addTodo();
  // });

  $('.main__input-text').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if ($('.main__input-text').value === '') {
      alert('할 일을 입력해주세요.');
      return;
    }
    if (e.key === 'Enter') {
      addTodo();
    }
  });
}

const app = new App();
