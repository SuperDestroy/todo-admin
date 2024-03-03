<script setup lang="ts">

import { NFlex } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { themeOverrides } = storeToRefs(useThemeStore());
</script>

<template>
  <n-flex justify="space-between" align="center" :wrap="false">
    <span>主题颜色</span>
    <n-color-picker class="w100px" v-model:value="themeOverrides.common.primaryColor" />
  </n-flex>
</template>

<style scoped lang="scss">

</style>
