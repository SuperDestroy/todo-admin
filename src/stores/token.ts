import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTokenStore = defineStore('todo-token',
  () => {
    const token = ref<string>('');
    const isAuth = computed<boolean>(() => {
      return token.value != null && token.value.length > 0;
    });

    return {
      token,
      isAuth
    };
  }, {
    persist: {
      storage: localStorage
    }
  });
