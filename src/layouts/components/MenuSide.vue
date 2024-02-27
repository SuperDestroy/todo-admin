<script setup lang="ts">
import { type MenuOption, NIcon, NLayoutSider } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import MenuSideLogo from '@/layouts/components/MenuSideLogo.vue';
import { computed, h } from 'vue';
import { nanoid } from 'nanoid';
import { Icon } from '@iconify/vue';

const { sideMenuWidth, sideMenuCollapsed, headerHeight, sideMenuCollapsedWidth } = storeToRefs(useThemeStore());
const menuOptions: MenuOption[] = [{
  key: nanoid(),
  label: '菜单1',
  children: undefined
}, {
  key: nanoid(),
  label: '菜单2',
  children: undefined
}, {
  key: nanoid(),
  label: '系统管理',
  iconString: 'mdi:settings',
  children: [{
    key: nanoid(),
    label: '用户管理',
    children: undefined,
    iconString: 'mdi:settings'
  }, {
    key: nanoid(),
    label: '角色管理',
    children: undefined,
    iconString: 'mdi:settings'
  }, {
    key: nanoid(),
    label: '菜单管理',
    children: undefined,
    iconString: 'mdi:settings'
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
  if ('href' in option) {
    return h(
      'a',
      { href: option.href, target: '_blank' },
      option.label as string
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

<style lang="scss" scoped>
</style>
