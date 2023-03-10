import { handleLoading, handleButtons } from './handleLoading';
import { HEADERS, ResponseValue } from './interface';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const HEADERS: HEADERS = {
  'content-type': 'application/json',
  apikey: `${import.meta.env.VITE_API_KEY}`,
  username: `${import.meta.env.VITE_USERNAME}`,
};

const HTTP_METHOD = {
  GET() {
    return {
      method: 'GET',
      headers: HEADERS,
    };
  },
  POST(title: string, order: number) {
    return {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ title, order }),
    };
  },
  UpdatePUT(title: string, done: boolean) {
    return {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ title, done }),
    };
  },
  ReorderPUT(taskIds: string) {
    return {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ taskIds }),
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
      headers: HEADERS,
    };
  },
};

const request = async (url: string, option: object) => {
  handleLoading.showLoading();
  handleButtons.disabledTrue();
  try {
    const res = await fetch(url, option);
    return await res.json();
  } catch (err) {
    console.log(err);
  } finally {
    handleLoading.hideLoading();
    handleButtons.disabledFalse();
  }
};

// data 없이 response를 내려주는 형태(DELETE method)
const requestWithoutJson = async (url: string, option: object) => {
  handleLoading.showLoading();
  handleButtons.disabledTrue();
  try {
    const res = await fetch(url, option);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    handleLoading.hideLoading();
    handleButtons.disabledFalse();
  }
};

const TaskApi = {
  /** 전체 task 불러오기 api */
  async getAllTask(): Promise<ResponseValue> {
    return request(`${BASE_URL}`, HTTP_METHOD.GET());
  },

  /** task 추가 api */
  async createTask(title: string, order: number): Promise<ResponseValue> {
    return request(`${BASE_URL}`, HTTP_METHOD.POST(title, order));
  },

  /** task(이름, 완료) 업데이트 api */
  async updateTask(
    taskId: string,
    title: string,
    done: boolean
  ): Promise<ResponseValue> {
    return request(`${BASE_URL}/${taskId}`, HTTP_METHOD.UpdatePUT(title, done));
  },

  /** task(reorder) 업데이트 api */
  async reorderTask(taskIds: string): Promise<ResponseValue> {
    return request(`${BASE_URL}/reorder`, HTTP_METHOD.ReorderPUT(taskIds));
  },

  /** task 삭제 api */
  async deleteTask(taskId: string) {
    return requestWithoutJson(`${BASE_URL}/${taskId}`, HTTP_METHOD.DELETE());
  },
};

export default TaskApi;
