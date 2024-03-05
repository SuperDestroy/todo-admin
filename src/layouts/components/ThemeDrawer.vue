<script setup lang="ts">

import { NFlex } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { themeOverrides, showTagsView, showFooter, showTagIcon, sideMenuWidth } = storeToRefs(useThemeStore());
</script>

<template>
  <n-flex vertical>
    <n-divider dashed title-placement="left">
      样式设置
    </n-divider>
    <n-flex justify="space-between" align="center" :wrap="false">
      <span>主题颜色</span>
      <n-color-picker class="w100px" v-model:value="themeOverrides.common.primaryColor" />
    </n-flex>
    <n-divider dashed title-placement="left">
      标签页设置
    </n-divider>
    <n-flex justify="space-between" align="center" :wrap="false">
      <span>是否显示</span>
      <n-switch v-model:value="showTagsView" />
    </n-flex>
    <n-flex justify="space-between" align="center" :wrap="false">
      <span>是否显示图标</span>
      <n-switch v-model:value="showTagIcon" />
    </n-flex>
    <n-divider dashed title-placement="left">
      菜单设置
    </n-divider>
    <n-flex justify="space-between" align="center" :wrap="false">
      <span>菜单宽度</span>
      <n-input-number class="w100px" v-model:value="sideMenuWidth" />
    </n-flex>
    <n-divider dashed title-placement="left">
      页脚设置
    </n-divider>
    <n-flex justify="space-between" align="center" :wrap="false">
      <span>是否显示</span>
      <n-switch v-model:value="showFooter" />
    </n-flex>
  </n-flex>
</template>

<style scoped lang="scss">

</style>
