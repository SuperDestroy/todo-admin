<script setup lang="ts">
import { NLayoutContent } from 'naive-ui';
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { headerHeight, footerHeight, showFooter, tagsViewHeight, showTagsView, darkMode } = storeToRefs(useThemeStore());
const contentRef = ref();
const darkModeBg = computed(() => {
  return !darkMode.value;
});

const height = computed(() => {
  return `calc(100vh - ${headerHeight.value}px - ${showFooter.value ? footerHeight.value : 0}px -  ${showTagsView.value ? tagsViewHeight.value : 0}px)`;
});

</script>

<template>
  <n-layout-content ref="contentRef" class="content" :class="{ 'bg-slate-50': darkModeBg }"
                    content-style="padding: 10px;">
    <router-view v-slot="{ Component, route }">
      <transition name="router_animate" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </n-layout-content>
</template>

<style lang="scss" scoped>
.content {
  height: v-bind(height);
}

.router_animate-enter-active {
  animation: zoomIn 0.25s;
}

.router_animate-leave-active {
  animation: zoomOut 0.25s;
}
</style>
