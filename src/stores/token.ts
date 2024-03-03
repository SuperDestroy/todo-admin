import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useTokenStore = defineStore('todo-token',
  () => {
    const token = ref<string>('');
    const isAuth = computed<boolean>(() => {
      return token.value != null && token.value.length > 0;
    });

    const router = useRouter();

    return {
      token,
      isAuth
    };
  }, {
    persist: {
      storage: localStorage
    }
  });
