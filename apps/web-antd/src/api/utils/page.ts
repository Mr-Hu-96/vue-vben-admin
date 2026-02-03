import type { PageResult, RuoYiPageResult } from '../types/page';

export function ruoyiPageRequest<T>(
  request: Promise<RuoYiPageResult<T>>,
): Promise<PageResult<T>> {
  return request.then((res) => ({
    items: res.rows,
    total: res.total,
  }));
}
