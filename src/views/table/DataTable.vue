<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
];

const data = ref(Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
})));

const pagination = {
  pageSize: 15
};
</script>

<template>
  <div>
    <n-flex vertical>
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="250"
      />
    </n-flex>
  </div>
</template>
