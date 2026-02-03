export interface RuoYiPageResult<T> {
  rows: T[];
  total: number;
}

export interface PageResult<T> {
  items: T[];
  total: number;
}
