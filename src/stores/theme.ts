import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('todo-theme', () => {
  const headerHeight = ref(60);
  const tagsViewHeight = ref(40);
  const showTagsView = ref(true);
  const footerHeight = ref(42);
  const showFooter = ref(true);
  const sideMenuWidth = ref(256);
  const sideMenuCollapsedWidth = ref(64);
  const sideMenuCollapsed = ref(false);
  const fullScreen = ref(false);
  const darkMode = ref(false);
  const themeOverrides = ref<any>({
    common: {
      primaryColor: '#18a058'
    }
  });
  return {
    headerHeight,
    tagsViewHeight,
    showTagsView,
    footerHeight,
    showFooter,
    sideMenuWidth,
    sideMenuCollapsedWidth,
    sideMenuCollapsed,
    fullScreen,
    darkMode,
    themeOverrides
  };
}, {
  persist: {
    storage: localStorage
  }
});
