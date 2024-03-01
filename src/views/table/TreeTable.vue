<script lang="ts" setup>
import { ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';

type RowData = {
  name: string
  index: string
  children?: RowData[]
}

const data = ref<RowData[]>([
  {
    name: '07akioni',
    index: '07',
    children: [
      {
        name: '08akioni',
        index: '08',
        children: [
          {
            name: '09akioni',
            index: '09'
          },
          {
            name: '10akioni',
            index: '10'
          }
        ]
      }
    ]
  },
  {
    name: '11akioni',
    index: '11'
  }
]);

const columns = ref<DataTableColumns<RowData>>([
  {
    type: 'selection'
  },
  {
    title: 'name',
    key: 'name'
  },
  {
    title: 'index',
    key: 'index'
  }
]);

const rowKey = ((row: RowData) => {
  return row.index;
});

</script>
<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      default-expand-all
    />
  </div>
</template>

