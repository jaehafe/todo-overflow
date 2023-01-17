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
            <input readonly class="main__todo-list--title todo-title" value="${todo}"/>
          </div>
          <div class="main__todo-list--btn-container">
            <button class="main__todo-list--done-btn btn done-btn">완료</button>
            <button class="main__todo-list--edit-btn btn edit-btn">수정</button>
            <button class="main__todo-list--delete-btn btn delete-btn">삭제</button>
          </div>
        </li>`;
    };
    $('.main__todo').insertAdjacentHTML('afterbegin', todoTemplate(todo));
    updateToDoCount();
    $('.main__input-text').value = '';
  };

  // todo edit 함수
  // 1. 수정 버튼을 클릭하면 -> 저장 글씨 바뀜, input.focus()
  // 2. todo-title이 바뀔 수 있게
  // 3. 다시 저장 버튼을 클릭하면 -> 수정 글씨 바뀌고 입력된 title 저장, input.blur()
  // const $editBtn = e.target.closest('li').querySelector('.edit-btn');
  const updateTodoTitle = (e) => {
    const $editBtn = e.target.closest('li').querySelector('.edit-btn');
    const $editInput = e.target.closest('li').querySelector('.todo-title');

    if ($editBtn.textContent === '수정') {
      $editInput.removeAttribute('readonly');
      $editBtn.innerText = '저장';
      $editInput.focus();
      console.log('edit');
    } else if ($editBtn.textContent === '저장') {
      $editInput.setAttribute('readonly', 'readonly');
      // $editInput.blur();
      $editBtn.innerText = '수정';

      console.log('save');
    }
  };

  // todo 수정 함수
  const updateTodo = (e) => {
    if (e.target.classList.contains('edit-btn')) {
      updateTodoTitle(e);
      console.log('click');
      return;
    }
  };

  // todo 삭제 함수
  const deleteTodo = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updateToDoCount();
    }
  };
  // 이벤트 위임
  $('.main__todo').addEventListener('click', (e) => {
    updateTodo(e);
    // todo 삭제
    if (e.target.classList.contains('delete-btn')) {
      deleteTodo(e);
    }
  });

  // form 태그 새로고침 방지
  $('.main__input-container').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#todo-add-btn').addEventListener('click', () => {
    if ($('.main__input-text').value === '') {
      alert('할 일을 입력해주세요.');
      return;
    }
    addTodo();
  });

  /** 엔터키 입력시 enter */
  // $('.main__input-text').addEventListener('keypress', (e) => {
  //   if (e.key !== 'Enter') {
  //     return;
  //   }
  // if ($('.main__input-text').value === '') {
  //   alert('할 일을 입력해주세요.');
  //   return;
  // }
  //   if (e.key === 'Enter') {
  //     addTodo();
  //     console.log('enter');
  //   }
  // });
}

const app = new App();
