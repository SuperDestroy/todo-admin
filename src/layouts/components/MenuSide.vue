<script setup lang="ts">
import { type MenuOption, NIcon, NLayoutSider } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import MenuSideLogo from '@/layouts/components/MenuSideLogo.vue';
import { computed, h } from 'vue';
import { nanoid } from 'nanoid';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

const { sideMenuWidth, sideMenuCollapsed, headerHeight, sideMenuCollapsedWidth } = storeToRefs(useThemeStore());
const menuOptions: MenuOption[] = [{
  key: nanoid(),
  label: '菜单1',
  children: undefined
}, {
  key: nanoid(),
  label: '列表',
  iconString: 'material-symbols:table-chart',
  children: [{
    key: nanoid(),
    label: '普通列表',
    to: '/ordinary-table',
    iconString: 'material-symbols:table-chart',
    children: undefined
  }]
}, {
  key: nanoid(),
  label: '关于',
  children: undefined,
  iconString: 'mdi:info-outline'
}, {
  key: nanoid(),
  label: '多级菜单',
  children: [{
    key: nanoid(),
    label: '菜单1',
    children: [{
      key: nanoid(),
      label: '菜单1-1',
      children: undefined
    }, {
      key: nanoid(),
      label: '菜单1-2',
      children: undefined
    }]
  }, {
    key: nanoid(),
    label: '菜单2',
    children: [{
      key: nanoid(),
      label: '菜单2-1',
      children: undefined
    }, {
      key: nanoid(),
      label: '菜单2-2',
      children: undefined
    }]
  }]
}];
const style = computed(() => {
  return {
    height: `calc(100vh - ${headerHeight.value}px)`
  };
});
const renderMenuIcon = (option: MenuOption) => {
  let iconString = '';
  if ('iconString' in option) {
    iconString = option['iconString'] as string;
  } else {
    iconString = 'mdi:menu';
  }
  return h(NIcon, null, () => h(Icon, { icon: iconString }));
};
const renderMenuLabel = (option: MenuOption) => {
  if ('to' in option) {
    return h(
      RouterLink,
      { to: option['to'] as string, class: 'menu-item-label' },
      () => option.label as string
    );
  }
  return h('span', {
    style: 'font-weight: 500; font-size: 1em'
  }, option.label as string);
};
</script>

<template>
  <n-layout-sider collapse-mode="width"
                  bordered
                  :width="sideMenuWidth"
                  :collapsed="sideMenuCollapsed"
                  :collapsed-width="sideMenuCollapsedWidth"
                  :native-scrollbar="false">
    <menu-side-logo />
    <n-scrollbar :style="style">
      <n-menu
        accordion
        :collapsed="sideMenuCollapsed"
        :collapsed-width="sideMenuCollapsedWidth"
        :options="menuOptions"
        :indent="18"
        :render-icon="renderMenuIcon"
        :render-label="renderMenuLabel"
      />
    </n-scrollbar>
  </n-layout-sider>
</template>

<style lang="scss">
.menu-item-label {
  font-weight: 500;
  font-size: 1em
}
</style>
