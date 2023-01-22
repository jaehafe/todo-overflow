import '../scss/style.scss';
import Sortable from 'sortablejs';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const BASE_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos';
let taskOrder = 0;

const TaskApi = {
  /** 전체 task 불러오기 api */
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

  /** task 추가 api */
  async createTask(title, order) {
    // POST api 요청
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202301',
        username: 'KDT4_LeeJaeHa',
      },
      body: JSON.stringify({
        title,
        order,
      }),
    });
    return await res.json();
  },

  /** task(이름, 완료) 업데이트 api */
  async updateTask(taskId, title, done) {
    try {
      const res = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202301',
          username: 'KDT4_LeeJaeHa',
        },
        body: JSON.stringify({
          title,
          done,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  /** task(reorder) 업데이트 api */
  async reorderTask(taskIds) {
    try {
      const res = await fetch(`${BASE_URL}/reorder`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202301',
          username: 'KDT4_LeeJaeHa',
        },
        body: JSON.stringify(taskIds),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  /** task 삭제 api */
  async deleteTask(taskId) {
    try {
      const res = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202301',
          username: 'KDT4_LeeJaeHa',
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};

let tasks = [];

const render = async () => {
  tasks = await TaskApi.getAllTask();
  const template = tasks
    .map((task) => {
      return `
    <li class="main__todo-list ${task.done ? 'complete' : ''}" data-todo-id="${
        task.id
      }" data-todo-order="${task.order}">
      <div class="main__todo-list--title-container">
        <div>
          <span class="main__todo-list--date createdAt">생성: ${formattedDate(
            task.createdAt
          )}</span>
          <span class="main__todo-list--date updatedAt">수정: ${formattedDate(
            task.updatedAt
          )}</span>
        </div>
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

const init = async () => {
  tasks = await TaskApi.getAllTask();

  $('.main__input-text').focus();
  // if (task.done) {
  //   $('.main__todo-list').classList.add('complete');
  // }
  render();
};

/** 할 일 개수 업데이트 함수 */
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
/** 할 일 수정 함수 */
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
/** 할 일 이름 수정 이벤트 */
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
/** 할 일 완료 함수 */
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

/** 할 일 완료 이벤트 */
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('done-btn')) {
    completeTask(e);
    return;
  }
});

/** 할 일 삭제 이벤트 */
$('.main__todo').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(e);
  }
  return;
});
/** 할 일 삭제 함수 */
const deleteTask = async (e) => {
  const $taskId = e.target.closest('li').dataset.todoId;
  // const filtered = tasks.filter((task) => task.id !== $taskId);
  await TaskApi.deleteTask($taskId);
  // await reorderTask();
  render();
};

/**
 * 1. '전체삭제' 버튼을 클릭하면 li 전체 삭제
 * 2. task id만 추출
 * 3. ul 태그 안에 있는 li 길이만큼 순회하면서 삭제
 */
/** 할 일 '전체 삭제' */
$('.main__header-delete-btn').addEventListener('click', async () => {
  deleteAllTask();
  return;
});

// 할 일 '전체 삭제' 함수
const deleteAllTask = async () => {
  const taskId = tasks.map((task) => {
    return task.id;
  });
  for (let i = 0; i < tasks.length; i++) {
    await TaskApi.deleteTask(taskId[i]);
  }
  render();
};

// 할 일 추가
$('#todo-add-btn').addEventListener('click', async (e) => {
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

  await TaskApi.createTask(inputValue, taskOrder);
  render();

  inputValue = '';
};

/** 할 일 재정렬 함수 */
const reorderTask = async () => {
  const tasksList = await TaskApi.getAllTask();
  const reorderedTaskIds = [];
  tasksList.map((task) => {
    return reorderedTaskIds.push(task.id);
  });
  console.log(reorderedTaskIds);
  await TaskApi.reorderTask(reorderedTaskIds);
};

// sortableJS
new Sortable($('.main__todo'), {
  animation: 150,
});

/** createdAt, updatedAt 조작 */
const formattedDate = (taskDate) => {
  const date = new Date(taskDate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const today = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${today} ${hour}:${min}`;
};

/** 완료, 순서에 값에 따라 render */
// const renderTasks = async (done, order) => {
//   // 순서
//   if (order === $('#select-new')) {
//     return tasks.sort(
//       (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
//     );
//   } else if (order === $('#select-old')) {
//     return tasks.sort(
//       (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
//     );
//   }
//   // 완료
//   if (done === $('#select-completed')) {
//     return (tasks = tasks.filter((task) => task.done === true));
//   } else if (done === $('#select-doing')) {
//     return (tasks = tasks.filter((task) => task.done === false));
//   }
// };

// console.log(renderTasks($('#select-completed'), $('#select-new')));

// 최초 화면 로드 시 렌더링
window.addEventListener('DOMContentLoaded', init);
