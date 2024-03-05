<script setup lang="ts">
import { NLayout } from 'naive-ui';
import MenuSide from '@/layouts/components/MenuSide.vue';
import MainContent from '@/layouts/components/MainContent.vue';
import FooterContent from '@/layouts/components/FooterContent.vue';
import HeaderContent from '@/layouts/components/HeaderContent.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import TagsView from '@/layouts/components/TagsView.vue';
import { onMounted, ref } from 'vue';
import { useFullscreen } from '@vueuse/core';
import eventBus from '@/utils/EventBus';

const { showFooter, showTagsView } = storeToRefs(useThemeStore());
const contentRef = ref();
const { isFullscreen, toggle } = useFullscreen(contentRef);

onMounted(() => {
  eventBus.on('FullScreenContent', () => {
    toggle();
  });
});
</script>

<template>
  <n-layout has-sider class="h100vh w100vw">
    <menu-side />
    <n-layout>
      <header-content />
      <div ref="contentRef">
        <tags-view v-if="showTagsView" :is-full-screen="isFullscreen" />
        <main-content />
        <footer-content v-if="showFooter" />
      </div>
    </n-layout>
  </n-layout>
</template>
