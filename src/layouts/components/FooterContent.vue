<script setup lang="ts">
import { NFlex, NLayoutFooter } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { footerHeight } = storeToRefs(useThemeStore());
const height = computed(() => {
  return `${footerHeight.value}px`;
});
</script>

<template>
  <n-layout-footer class="footer" bordered>
    <n-flex class="h-full" justify="center" align="center">
      <span>@版权所有 2023-2024</span>
    </n-flex>
  </n-layout-footer>
</template>

<style scoped>
.footer {
  height: v-bind(height)
}
</style>
