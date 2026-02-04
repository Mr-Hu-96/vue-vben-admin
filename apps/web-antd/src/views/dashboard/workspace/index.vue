<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page, WorkbenchHeader } from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { Button } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getBuyOrderList } from '#/api';

const userStore = useUserStore();
interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}
const router = useRouter();
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'buyOrderCode',
      label: '单据编号',
    },
    {
      component: 'Input',
      fieldName: 'buyer',
      label: '采购员',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '待审批',
            value: '待审批',
          },
          {
            label: '进行中',
            value: '进行中',
          },
          {
            label: '已完成',
            value: '已完成',
          },
          {
            label: '已取消',
            value: '已取消',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'status',
      label: '订单状态',
    },
    {
      component: 'RangePicker',
      defaultValue: [dayjs().subtract(7, 'days'), dayjs()],
      fieldName: 'date',
      label: '采购日期',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { align: 'left', type: 'checkbox', width: 60 },
    { field: 'buyOrderCode', title: '单据编号' },
    { field: 'status', title: '订单状态' },
    { field: 'supplier', title: '供应商' },
    { field: 'buyOrderDate', title: '采购日期' },
    { field: 'planDeliveryDate', title: '计划到货日期' },
    { field: 'orderProductNumber', title: '订单项数' },
    { field: 'orderQuantity', title: '订单数量' },
    { field: 'money', title: '订单金额' },
    { field: 'buyer', title: '采购员' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const data = await getBuyOrderList({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <template #title>
      <WorkbenchHeader
        :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
      >
        <template #title>
          早安, {{ userStore.userInfo?.realName }}, 开始您一天的工作吧！
        </template>
        <template #description> 今日晴，20℃ - 32℃！ </template>
      </WorkbenchHeader>
    </template>
    <Grid>
      <template #action="{ row }">
        <Button
          type="link"
          @click="router.push(`/dashboard/workspace/detail/${row.id}`)"
        >
          查看
        </Button>
      </template>
    </Grid>
  </Page>
</template>
