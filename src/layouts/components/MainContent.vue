<script setup lang="ts">
import { NLayoutContent } from 'naive-ui';
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { headerHeight, footerHeight, showFooter, darkMode } = storeToRefs(useThemeStore());
const contentRef = ref();
const darkModeBg = computed(() => {
  return !darkMode.value;
});

const height = computed(() => {
  return `calc(100vh - ${headerHeight.value}px - ${showFooter.value ? footerHeight.value : 0}px)`;
});

</script>

<template>
  <n-layout-content ref="contentRef" class="content" :class="{ 'bg-gray-100': darkModeBg }"
                    content-style="padding: 10px;">
    <router-view />
  </n-layout-content>
</template>

<style lang="scss" scoped>
.content {
  height: v-bind(height)
}
</style>
