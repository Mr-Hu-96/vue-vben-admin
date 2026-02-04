import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';
import { ruoyiPageRequest } from '#/api/utils/page';

interface RuoYiPageResult<T> {
  rows: T[];
  total: number;
}
export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    approvalDate: string;
    buyOrderCode: string;
    buyOrderDate: string;
    orderDetailList: any[];
    supplier: string;
    status: string;
    remark?: string;
  }
}

/**
 * 获取采购订单数据
 */
async function getBuyOrderList(params: Recordable<any>) {
  return ruoyiPageRequest(
    requestClient.get<RuoYiPageResult<SystemRoleApi.SystemRole>>(
      '/buy/order/list',
      { params },
    ),
  );
}

/**
 * 获取采购订单详情
 */
async function getBuyOrderDetail(id: string) {
  return requestClient.get<SystemRoleApi.SystemRole>(`/buy/order/${id}`);
}

export { getBuyOrderDetail, getBuyOrderList };
