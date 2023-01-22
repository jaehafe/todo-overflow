import '../scss/style.scss';
import moment from 'moment';
const nowTime = moment().format('M/DD H:m:s');
console.log(nowTime);

const $ = (selector) => document.querySelector(selector);
const BASE_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos';

const TaskApi = {
  // 전체 task 불러오기 api
  async getAllTask() {
    const res = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202301',
        username: 'KDT4_LeeJaeHa',
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  },
  // id: task.id,
  // order: '',
  // done: task.done,
  // createdAt: task.createdAt,
  // updatedAt: task.updatedAt,

  // task 추가 api
  async createTask(name) {
    // const task = {
    //   id: new Date().getTime(),
    //   order: '',
    //   title: inputValue,
    //   done: false,
    //   createdAt: `${nowTime}`,
    //   updatedAt: `${nowTime}`,
    // };

    // POST api 요청
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202301',
        username: 'KDT4_LeeJaeHa',
      },
      body: JSON.stringify({
        title: name,
      }),
    });
    return await res.json();
  },

  // task(이름, 완료) 업데이트 api
  // https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  async updateTask(todoId, name, done) {
    try {
      const res = await fetch(`${BASE_URL}/${todoId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202301',
          username: 'KDT4_LeeJaeHa',
        },
        body: JSON.stringify({
          title: name,
          done: done,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  // task 삭제 api
  // https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  async deleteTask(todoId) {
    try {
      const res = await fetch(`${BASE_URL}/${todoId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202301',
          username: 'KDT4_LeeJaeHa',
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
};

let tasks = [];

const init = async () => {
  tasks = await TaskApi.getAllTask();

  $('.main__input-text').focus();
  // if (task.done) {
  //   $('.main__todo-list').classList.add('complete');
  // }
  render();
};

// 할 일 개수 업데이트 함수
const updateTaskCount = () => {
  // const taskCount = $('.main__todo').querySelectorAll('li').length;
  // $('.todo-total-count').innerHTML = `총 ${taskCount}개`;
  const completedTaskArray = tasks.filter((task) => task.done === true);
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
const updateTask = async (e) => {
  const $taskId = e.target.closest('li').dataset.todoId;
  const taskObj = tasks.find((task) => task.id === $taskId);
  console.log(taskObj.title);
  const $editBtn = e.target.closest('li').querySelector('.edit-btn');
  const $taskTitle = e.target.closest('li').querySelector('.todo-title');

  if ($editBtn.innerText.trim() === '수정') {
    $taskTitle.setAttribute('contenteditable', 'true');
    $editBtn.innerText = '저장';
    $taskTitle.focus();
  } else if ($editBtn.innerText.trim() === '저장') {
    const editedTaskTitle = $taskTitle.innerText;
    $taskTitle.setAttribute('contenteditable', 'false');
    $editBtn.innerText = '수정';

    taskObj.title = editedTaskTitle;
    await TaskApi.updateTask($taskId, taskObj.title, taskObj.done);
    render();
  }
};
// 할 일 이름 수정
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    updateTask(e);
    return;
  }
});

/**
 * 1. 완료 버튼을 클릭하면, 클릭한 task li에 classList.add (complete)
 * 2.
 */
// 할 일 완료 함수
const completeTask = async (e) => {
  const $doneBtn = e.target.closest('li').querySelector('.done-btn');
  const $taskId = e.target.closest('li').dataset.todoId;
  let taskObj = tasks.find((task) => task.id === $taskId);

  if ($doneBtn.textContent.trim() === '하는 중') {
    console.log($doneBtn.textContent.trim());
    // $doneBtn.textContent = '완료';
  } else if ($doneBtn.textContent.trim() === '완료') {
    // $doneBtn.textContent = '하는 중';
  }
  taskObj.done = !taskObj.done;
  await TaskApi.updateTask($taskId, taskObj.title, taskObj.done);
  render();
};
// 할 일 완료
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('done-btn')) {
    completeTask(e);
    return;
  }
});

// 할 일 삭제
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(e);
  }
  return;
});
// 할 일 삭제 함수
const deleteTask = async (e) => {
  const $taskId = e.target.closest('li').dataset.todoId;
  const filtered = tasks.filter((task) => task.id !== $taskId);
  // tasks = filtered;
  await TaskApi.deleteTask($taskId);
  render();
};

// 할 일 추가
$('#todo-add-btn').addEventListener('click', (e) => {
  e.preventDefault();

  createTask();
  return;
});

// 할 일 추가 함수
const createTask = async () => {
  let inputValue = $('.main__input-text').value;

  if (inputValue.trim() === '') {
    alert('할 일을 입력하세요');
    return;
  }

  await TaskApi.createTask(inputValue);
  render();
  inputValue = '';
};

const render = async () => {
  tasks = await TaskApi.getAllTask();
  const template = tasks
    .map((task) => {
      return `
    <li class="main__todo-list ${task.done ? 'complete' : ''}" data-todo-id="${
        task.id
      }">
      <div class="main__todo-list--title-container">
        <span class="main__todo-list--date">${
          task.updatedAt ? task.updatedAt : task.createdAt
        }</span>
        <span
          contenteditable="false"
          class="main__todo-list--title todo-title"
          >${task.title}</span
        >
      </div>
      <div class="main__todo-list--btn-container">
        <button class="main__todo-list--done-btn btn done-btn">
        ${task.done ? '완료' : '하는 중'}
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

// 최초 화면 로드 시 렌더링
window.addEventListener('DOMContentLoaded', init);
