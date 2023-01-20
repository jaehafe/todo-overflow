import '../scss/style.scss';

const $ = (selector) => document.querySelector(selector);

let tasks = [];

// 할 일 개수 업데이트 함수
const updateTaskCount = () => {
  // const taskCount = $('.main__todo').querySelectorAll('li').length;
  // $('.todo-total-count').innerHTML = `총 ${taskCount}개`;
  const completedTaskArray = tasks.filter((task) => task.isCompleted === true);
  $('.todo-total-count').textContent = `할 일 전체 ${tasks.length}개`;
  $('.completed-task').textContent = `완료 ${completedTaskArray.length}개`;
  $('.remaining-task').textContent = `하는 중 ${
    tasks.length - completedTaskArray.length
  }개`;
};

// 할 일 수정
/**
 * 저장버튼일때
 * 1. '수정' 버튼을 클릭하면 '저장'으로 바뀐다.
 * 2. task title에 focus된다. ('.todo-title')의 속성 contenteditable이 true로 된다(수정 가능)
 * 3.
 *
 * 1. 저장 버튼을 클릭하면 ('.todo-title')의 속성 contenteditable이 false 된다(수정 불가능)
 * 2. ('.todo-title')에 입력된 값이 task.name에 새로 할당한다.
 * 3. 다시 렌더링한다(render 함수 사용)
 */
// 할 일 이름 수정 함수
const editTaskName = (e) => {
  const taskId = e.target.closest('li').dataset.todoId;
  const taskObj = tasks.find((task) => task.id === Number(taskId));
  console.log(taskObj.name);
  // const title = tasks.map((task) => task === taskObj);
  // const titleIndex = title.indexOf(true);
  // console.log(taskId);
  const $editBtn = e.target.closest('li').querySelector('.edit-btn');
  const $taskTitle = e.target.closest('li').querySelector('.todo-title');

  if ($editBtn.innerText.trim() === '수정') {
    $taskTitle.setAttribute('contenteditable', 'true');
    $editBtn.innerText = '저장';
  } else if ($editBtn.innerText.trim() === '저장') {
    $taskTitle.focus();
    const editedTaskTitle = $taskTitle.innerText;
    $taskTitle.setAttribute('contenteditable', 'false');
    $editBtn.innerText = '수정';

    // tasks[titleIndex].name = editedTaskTitle;
    taskObj.name = editedTaskTitle;
    render();
  }
};
// 할 일 이름 수정 함수
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    editTaskName(e);
    return;
  }
});

/**
 * 1. 완료 버튼을 클릭하면, 클릭한 task li에 classList.add (complete)
 * 2.
 */
// 할 일 완료 함수
const completeTask = (e) => {
  const $doneBtn = e.target.closest('li').querySelector('.done-btn');
  const $taskId = e.target.closest('li').dataset.todoId;
  let taskObj = tasks.find((task) => task.id === Number($taskId));

  if ($doneBtn.textContent.trim() === '하는 중') {
    console.log($doneBtn.textContent.trim());
    // $doneBtn.textContent = '완료';
  } else if ($doneBtn.textContent.trim() === '완료') {
    // $doneBtn.textContent = '하는 중';
  }
  taskObj.isCompleted = !taskObj.isCompleted;
  render();
};
// 할 일 완료
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('done-btn')) {
    completeTask(e);
    return;
  }
});

// 할 일 제거 함수
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    let taskId = e.target.closest('li').dataset.todoId;
    deleteTask(taskId);
  }
  return;
});
// filter함수
const deleteTask = (taskId) => {
  const filtered = tasks.filter((task) => Number(taskId) !== task.id);
  tasks = filtered;
  render();
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
  render();
};

// 렌더
const render = () => {
  console.log(tasks);
  const template = tasks
    .map((task) => {
      return `
    <li class="main__todo-list ${
      task.isCompleted ? 'complete' : ''
    }" data-todo-id="${task.id}">
      <div class="main__todo-list--title-container">
        <span class="main__todo-list--date">${month}/${date}</span>
        <span
          contenteditable="false"
          class="main__todo-list--title todo-title"
          >${task.name}</span
        >
      </div>
      <div class="main__todo-list--btn-container">
        <button class="main__todo-list--done-btn btn done-btn">
        ${task.isCompleted ? '완료' : '하는 중'}
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
    })
    .join('');

  $('.main__todo').innerHTML = template;
  $('.main__input-text').value = '';
  updateTaskCount();
};

// 할 일 수정
// $('.main__todo').addEventListener('click', (e) => {
//   const taskList = e.target.closest('li');
//   if (taskList.querySelector('.edit-btn').textContent === '수정') {
//     const inputValue = taskList.querySelector('.todo-title');
//     inputValue.focus();
//     taskList.querySelector('.todo-title').setAttribute = 'contenteditable';
//     taskList.querySelector('.edit-btn').textContent = '저장';
//   }
//   // else if(taskList.querySelector('.edit-btn').textContent === '저장') {

//   // }
// });
