<script setup lang="ts">
import { NLayout } from 'naive-ui';
import MenuSide from '@/layouts/components/MenuSide.vue';
import MainContent from '@/layouts/components/MainContent.vue';
import FooterContent from '@/layouts/components/FooterContent.vue';
import HeaderContent from '@/layouts/components/HeaderContent.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import TagsView from '@/layouts/components/TagsView.vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import eventBus from '@/utils/EventBus';

const { showHeader, showFooter, showTagsView } = storeToRefs(useThemeStore());
const fullScreenContent = ref(false);

onMounted(() => {
  eventBus.on('FullScreenContent', () => {
    fullScreenContent.value = true;
    showHeader.value = false;
  });
  eventBus.on('ExitFullScreenContent', () => {
    nextTick(() => {
      fullScreenContent.value = false;
      showHeader.value = true;
    });
  });
});

const hasSide = computed(() => !fullScreenContent.value);
</script>

<template>
  <n-layout :has-sider="hasSide" class="h100vh w100vw">
    <menu-side v-if="hasSide" />
    <n-layout>
      <header-content v-if="showHeader" />
      <tags-view v-if="showTagsView" />
      <main-content />
      <footer-content v-if="showFooter" />
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
</style>
