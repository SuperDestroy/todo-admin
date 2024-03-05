<script setup lang="ts">
import MenuSideLogo from '@/layouts/components/MenuSideLogo.vue';
import { type MenuOption, NIcon, NLayoutSider } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, h } from 'vue';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { useAppDataStore } from '@/stores/appData';
import type { MenuModel } from '@/models';
import { menu } from '@/data/data';


const { sideMenuWidth, sideMenuCollapsed, headerHeight, sideMenuCollapsedWidth } = storeToRefs(useThemeStore());
const { addTag, menus } = useAppDataStore();
const menuOptions: MenuOption[] = menus;
const style = computed(() => {
  return {
    height: `calc(100vh - ${headerHeight.value}px)`
  };
});
const renderMenuIcon = (option: MenuOption) => {
  const menu = option as MenuModel;
  let icon = '';
  if (menu.iconStr.length > 0) {
    icon = menu.iconStr;
  } else {
    icon = 'mdi:menu';
  }
  return h(NIcon, null, () => h(Icon, { icon: icon }));
};
const renderMenuLabel = (option: MenuOption) => {
  if ('to' in option) {
    return h(
      RouterLink,
      { to: option['to'] as string, class: 'menu-item-label' },
      () => option.name as string
    );
  }
  return h('span', {
    style: 'font-weight: 500; font-size: 1em'
  }, option.name as string);
};

const onChecked = (key: string, item: MenuOption) => {
  const menu = item as MenuModel;
  if (menu.to.length > 0) {
    addTag({
      id: menu.id,
      label: menu.name,
      to: menu.to,
      checked: false,
      default: menu.default,
      closeable: !menu.default,
      icon: menu.iconStr
    });
  }
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
        key-field="id"
        label-field="name"
        :collapsed="sideMenuCollapsed"
        :collapsed-width="sideMenuCollapsedWidth"
        :options="menuOptions"
        :indent="18"
        :render-icon="renderMenuIcon"
        :render-label="renderMenuLabel"
        @update:value="onChecked"
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
