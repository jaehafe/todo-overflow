import '../scss/style.scss';

const $ = (selector) => document.querySelector(selector);

let tasks = [];

// 할 일 개수 업데이트 함수
const updateTaskCount = () => {
  const taskCount = $('.main__todo').querySelectorAll('li').length;
  $('.todo-total-count').innerHTML = `총 ${taskCount}개`;
  const completedTaskArray = tasks.filter((task) => {
    task.isCompleted === true;
  });
  $('.todo-total-count').textContent = `할 일 전체 ${tasks.length}개`;
  $('.completed-task').textContent = `완료 ${completedTaskArray.length}개`;
  $('.remaining-task').textContent = `하는 중${
    tasks.length - completedTaskArray.length
  }개`;
};

// 할 일 제거 함수
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const taskId = e.target.closest('li').id;

    deleteTask(taskId);
    e.target.closest('li').remove();
  }
});

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => {
    task.id !== Number(taskId);
  });
  updateTaskCount();
};

// 할 일 추가
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

let month = new Date().getMonth() + 1;
let date = new Date().getDate();

// 할 일 추가 함수
const createTask = (task) => {
  if (task.isCompleted) {
    $('.main__todo-list').classList.add('complete');
  }
  const template = `
    <li class="main__todo-list" data-todo-id="${task.id}">
      <div class="main__todo-list--title-container">
        <span class="main__todo-list--date">${month}/${date}</span>
        <span
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
  updateTaskCount();
};

// 할 일 수정
$('.main__todo').addEventListener('click', (e) => {
  const taskList = e.target.closest('li');
  console.log(taskList);
  if (taskList.querySelector('.edit-btn').textContent === '수정') {
    const inputValue = taskList.querySelector('.todo-title');
    inputValue.focus();
    taskList.querySelector('.todo-title').setAttribute = 'contenteditable';
    taskList.querySelector('.edit-btn').textContent = '저장';
  }
  // else if(taskList.querySelector('.edit-btn').textContent === '저장') {

  // }
});
