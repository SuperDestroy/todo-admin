<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { darkMode } = storeToRefs(useThemeStore());
const theme = computed(() => {
  return darkMode.value ? darkTheme : undefined;
});
</script>

<template>
  <n-config-provider :theme="theme">
    <router-view />
  </n-config-provider>
</template>

<style scoped></style>
