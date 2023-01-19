import '../scss/style.scss';

const $ = (selector) => document.querySelector(selector);

let tasks = [];

$('#todo-add-btn').addEventListener('click', (e) => {
  e.preventDefault();

  const inputValue = $('.main__input-text').value;

  if (inputValue.trim() === '') {
    alert('할 일을 입력하세요');
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);

  createTask(task);
  $('.main__input-text').focus();
});
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();

const createTask = (task) => {
  if (task.isCompleted) {
    $('.main__todo-list').classList.add('complete');
  }
  const template = `
    <li class="main__todo-list" data-todo-id="${task.id}">
      <div class="main__todo-list--title-container">
        <span class="main__todo-list--date">${month}/${date}</span>
        <span
          ${!task.isCompleted ? 'contenteditable' : ''}
          class="main__todo-list--title todo-title"
          >${task.name}</span
        >
      </div>
      <div class="main__todo-list--btn-container">
        <button class="main__todo-list--done-btn btn done-btn">
          완료
        </button>
        <button class="main__todo-list--edit-btn btn edit-btn">
          수정
        </button>
        <button class="main__todo-list--delete-btn btn delete-btn">
          삭제
        </button>
      </div>
    </li>
    `;

  $('.main__todo').innerHTML += template;
  $('.main__input-text').value = '';
};
