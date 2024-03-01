<script setup lang="ts">
import { NLayout } from 'naive-ui';
import MenuSide from '@/layouts/components/MenuSide.vue';
import MainContent from '@/layouts/components/MainContent.vue';
import FooterContent from '@/layouts/components/FooterContent.vue';
import HeaderContent from '@/layouts/components/HeaderContent.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import TagsView from '@/layouts/components/TagsView.vue';

const { showFooter, showTagsView } = storeToRefs(useThemeStore());
</script>

<template>
  <n-layout has-sider class="h100vh w100vw">
    <menu-side />
    <n-layout>
      <header-content />
      <tags-view v-if="showTagsView" />
      <main-content />
      <footer-content v-if="showFooter" />
    </n-layout>
  </n-layout>
</template>
