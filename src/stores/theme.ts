import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('todo-theme', () => {
  const headerHeight = ref(60);
  const footerHeight = ref(42);
  const showFooter = ref(true);
  const sideMenuWidth = ref(200);
  const sideMenuCollapsedWidth = ref(64);
  const sideMenuCollapsed = ref(false);
  const fullScreen = ref(false);
  return {
    headerHeight,
    footerHeight,
    showFooter,
    sideMenuWidth,
    sideMenuCollapsedWidth,
    sideMenuCollapsed,
    fullScreen
  };
}, {
  persist: {
    storage: localStorage
  }
});