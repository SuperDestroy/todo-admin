<script setup lang="ts">
import { NButton, NFlex, NLayoutHeader } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useFullscreen, useToggle } from '@vueuse/core';
import ThemeDrawer from '@/layouts/components/ThemeDrawer.vue';


const { headerHeight, sideMenuCollapsed, darkMode } = storeToRefs(useThemeStore());
const height = computed(() => {
  return `${headerHeight.value}px`;
});
const sideMenuCollapsedToggle = useToggle(sideMenuCollapsed);
const { isFullscreen, toggle } = useFullscreen();
const darkModeToggle = useToggle(darkMode);
const showTheme = ref(false);

</script>

<template>
  <n-layout-header bordered class="header">
    <n-flex align="center" justify="space-evenly" class="h-full">
      <n-button @click="sideMenuCollapsedToggle()" quaternary :focusable="false">
        <template v-slot:icon>
          <icon v-if="sideMenuCollapsed" icon="material-symbols:format-indent-increase" />
          <icon v-else icon="material-symbols:format-indent-decrease" />
        </template>
      </n-button>
      <div grow></div>
      <n-button-group>
        <n-button @click="toggle" quaternary :focusable="false">
          <template v-slot:icon>
            <icon v-if="isFullscreen" icon="material-symbols:fullscreen-exit" />
            <icon v-else icon="material-symbols:fullscreen" />
          </template>
        </n-button>
        <n-button @click="darkModeToggle()" quaternary :focusable="false">
          <template v-slot:icon>
            <icon v-if="darkMode" icon="material-symbols:dark-mode-outline" />
            <icon v-else icon="material-symbols:light-mode-outline" />
          </template>
        </n-button>
        <n-button @click="showTheme = true" quaternary :focusable="false">
          <template v-slot:icon>
            <icon icon="ic:outline-microwave" />
          </template>
        </n-button>
        <n-button quaternary :focusable="false">
          <template v-slot:icon>
            <icon icon="material-symbols:account-circle-outline" />
          </template>
          <template v-slot:default>
            TodoX
          </template>
        </n-button>
      </n-button-group>
    </n-flex>
  </n-layout-header>
  <n-drawer v-model:show="showTheme" :width="365">
    <n-drawer-content title="主题设置" closable>
      <theme-drawer />
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
.header {
  height: v-bind(height)
}
</style>
