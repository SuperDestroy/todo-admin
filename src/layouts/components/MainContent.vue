<script setup lang="ts">
import { NLayoutContent } from 'naive-ui';
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { headerHeight, footerHeight, showFooter } = storeToRefs(useThemeStore());
const contentRef = ref();

const height = computed(() => {
  return `calc(100vh - ${headerHeight.value}px - ${showFooter.value ? footerHeight.value : 0}px)`;
});

</script>

<template>
  <n-layout-content ref="contentRef" class="content bg-gray-1" content-style="padding: 10px;">
    Content1
  </n-layout-content>
</template>

<style lang="scss" scoped>
.content {
  height: v-bind(height)
}
</style>
