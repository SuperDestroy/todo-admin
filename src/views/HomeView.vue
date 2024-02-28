<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
  <n-flex vertical>
    <n-card>
      <n-flex align="center">
        <n-avatar
          :size="64"
          src="https://images.chuanboyi.com/201705/4ef95d5926.jpg"
          :style="{
                    borderRadius: '5px',
                    backgroundColor: 'red'
                  }"
        />
        <n-flex vertical>
          <span h6 font-900>万事开头难，美好的一天开始了!</span>
          <span h6>加油吧骚年!</span>
        </n-flex>
        <div grow />
        <n-statistic label="统计数据" :value="99">
          <template #prefix>
            <n-icon>
              <icon icon="carbon:save" />
            </n-icon>
          </template>
          <template #suffix>
            / 100
          </template>
        </n-statistic>
      </n-flex>
    </n-card>
  </n-flex>
</template>
