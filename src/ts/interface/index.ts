export interface Todo {
  id: string; // 할 일 ID
  order: number; // 할 일 순서
  title: string; // 할 일 제목
  done: boolean; // 할 일 완료 여부
  createdAt: string; // 할 일 생성일
  updatedAt: string; // 할 일 수정일
}

export type ResponseValue = Todo[]; // 할 일 목록

export interface HEADERS {
  'content-type': string;
  apikey: string;
  username: string;
}

export interface HTTP_METHOD {}
