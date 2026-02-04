<script lang="ts" setup>
import type { Component } from 'vue';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getBuyOrderDetail } from '#/api';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}
const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'productCode', title: '产品编号' },
    { field: 'productName', title: '产品名称' },
    { field: 'productStandard', title: '产品规格' },
    { field: 'unit', title: '单位' },
    { field: 'deliveryDate', title: '产品交货日期' },
    { field: 'inventoryQty', title: '库存数量' },
    { field: 'qty', title: '数量' },
    { field: 'price', title: '单价(元)' },
    { field: 'money', title: '金额' },
    { field: 'inputTaxRate', title: '增值税税率' },
    { field: 'taxAmount', title: '税额' },
    { field: 'taxPrice', title: '含税单价' },
    { field: 'totalWithTax', title: '价税合计' },
    { field: 'shipmentQuantity', title: '发货数量' },
    { field: 'returnQuantity', title: '退货数量' },
    { field: 'unclearQuantity', title: '未收货数量' },
    { field: 'remark', title: '产品备注' },
  ],
  data: [],
  pagerConfig: {
    enabled: false,
  },
};
interface DescriptionItem {
  content: Component | string;
  title: string;
}
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
const route = useRoute();

const buyOrderData = ref<any>({});
const buyOrderId = computed(() => route.params.id as string);

watch(
  buyOrderId,
  (id) => {
    if (!id) return;
    getBuyOrderDetail(id).then((res) => {
      buyOrderData.value = res;
      gridApi.setGridOptions({ data: res.orderDetailList || [] });
    });
  },
  { immediate: true },
);

const vbenDescriptionItems = computed<DescriptionItem[]>(() => [
  { title: '单据编号', content: buyOrderData.value.buyOrderCode || '-' },
  { title: '订单状态', content: buyOrderData.value.status || '-' },
  { title: '供应商', content: buyOrderData.value.supplier || '-' },
  { title: '采购日期', content: buyOrderData.value.buyOrderDate || '-' },
  {
    title: '计划到货日期',
    content: buyOrderData.value.planDeliveryDate || '-',
  },
  { title: '订单项数', content: buyOrderData.value.orderProductNumber || '-' },
  { title: '订单数量', content: buyOrderData.value.orderQuantity || '-' },
  { title: '订单金额', content: buyOrderData.value.money || '-' },
  { title: '采购员', content: buyOrderData.value.buyer || '-' },
]);
</script>

<template>
  <Page>
    <div class="card-box mb-2 p-5">
      <div>
        <h5 class="text-lg text-foreground">基本信息</h5>
      </div>
      <div class="mt-4">
        <dl class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <template v-for="item in vbenDescriptionItems" :key="item.title">
            <div class="border-t border-border px-4 py-6 sm:col-span-1 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-foreground">
                {{ item.title }}
              </dt>
              <dd class="mt-1 text-sm leading-6 text-foreground sm:mt-2">
                <!-- <VbenRenderContent :content="item.content" /> -->
                {{ item.content }}
              </dd>
            </div>
          </template>
        </dl>
      </div>
    </div>
    <Grid table-title="产品列表" table-title-help="订单产品信息">
      <template #toolbar-tools>
        <Button type="primary">打印标签</Button>
      </template>
    </Grid>
  </Page>
</template>
