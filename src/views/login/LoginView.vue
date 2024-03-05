<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash';
import { useRouter } from 'vue-router';
import { useThemeVars } from 'naive-ui';
import { useTokenStore } from '@/stores/token';
import { nanoid } from 'nanoid';

const loginRef = ref(null);
const username = ref('admin');
const password = ref('123456');
const rememberMe = ref(false);
const login = ref(false);
const router = useRouter();
const tokenStore = useTokenStore();

const onLogin = _.debounce(() => {
  login.value = true;
  setTimeout(() => {
    login.value = false;
    tokenStore.token = nanoid();
    router.replace('/');
  }, 1500);
});

const themeVars = useThemeVars();

</script>
<template>
  <div class="login">
    <n-card class="container">
      <template v-slot:header>
        <n-flex justify="center" align="center" class="mb20px">
          <img src="@/assets/logo.svg" width="52" height="52">
          <span :style="{ color: themeVars.primaryColor }" class="font-bold text-3xl">TodoAdmin管理系统</span>
        </n-flex>
        <n-flex>
          <span :style="{ color: themeVars.primaryColor }" class="font-bold text-lg">密码登录</span>
        </n-flex>
      </template>
      <n-form
        ref="formRef"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item path="inputValue">
          <n-input placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="inputValue">
          <n-input type="password" placeholder="请输入密码" />
        </n-form-item>
      </n-form>
      <template v-slot:action>
        <n-button class="w-full" @click="onLogin" :loading="login">登录</n-button>
      </template>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: url("@/assets/login/bg.png") no-repeat;
  background-size: cover;
}

.container {
  width: 448px;
  height: 446px;
  padding: 20px 24px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
