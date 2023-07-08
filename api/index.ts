// 通用

export * from './user';
export * from './posts';
export * from './comments';

export interface Pager {
  page: number;
  size: number;
}

export interface Author {
  id: string;
  username: string;
}
