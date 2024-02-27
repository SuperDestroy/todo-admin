<script setup lang="ts">
import { NButton, NFlex, NLayoutHeader } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useFullscreen, useToggle } from '@vueuse/core';


const { headerHeight, sideMenuCollapsed } = storeToRefs(useThemeStore());
const height = computed(() => {
  return `${headerHeight.value}px`;
});
const sideMenuCollapsedToggle = useToggle(sideMenuCollapsed);
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <n-layout-header bordered class="header">
    <n-flex class="h-full" align="center" justify="space-evenly">
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
</template>

<style lang="scss" scoped>
.header {
  height: v-bind(height)
}
</style>
