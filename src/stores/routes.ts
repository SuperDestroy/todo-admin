import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoutesStore = defineStore('todo-routes', () => {
  const routes = ref<TagModel[]>([]);
  return {
    routes
  };
});
