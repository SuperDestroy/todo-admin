<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useThemeVars } from 'naive-ui';
import { storeToRefs } from 'pinia';

const { headerHeight, sideMenuCollapsed } = storeToRefs(useThemeStore());
const themeVars = useThemeVars();
const height = computed(() => {
  return `${headerHeight.value}px`;
});
const color = computed(() => {
  return themeVars.value.primaryColor;
});
</script>

<template>
  <n-flex class="logo" justify="center" align="center" :wrap="false">
    <icon icon="bxl:vuejs" width="36px" height="36px" />
    <span v-if="!sideMenuCollapsed" class="text-nowrap font-bold">TodoAdmin管理系统</span>
  </n-flex>
</template>

<style scoped lang="scss">
.logo {
  height: v-bind(height);
  color: v-bind(color);
}
</style>
