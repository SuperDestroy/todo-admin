<script setup lang="ts">
import { NLayoutContent } from 'naive-ui';
import { computed, nextTick, onMounted, ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import eventBus from '@/utils/EventBus';

const {
  headerHeight,
  showHeader,
  footerHeight,
  showFooter,
  tagsViewHeight,
  showTagsView,
  darkMode
} = storeToRefs(useThemeStore());
const contentRef = ref();
const darkModeBg = computed(() => {
  return !darkMode.value;
});
const routerViewActive = ref(true);

const height = computed(() => {
  return `calc(100vh - ${showHeader.value ? headerHeight.value : 0}px - ${showFooter.value ? footerHeight.value : 0}px - ${showTagsView.value ? tagsViewHeight.value : 0}px)`;
});

onMounted(() => {
  eventBus.on('RefreshContent', () => {
    routerViewActive.value = false;
    nextTick(() => {
      routerViewActive.value = true;
    });
  });
});

</script>

<template>
  <n-layout-content ref="contentRef" class="content" :class="{ 'bg-slate-50': darkModeBg }"
                    content-style="padding: 10px;">
    <router-view v-slot="{ Component, route }" v-if="routerViewActive">
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
