<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const back = () => {
  router.replace('/');
};
</script>

<template>
  <n-layout>
    <n-layout-content>
      <n-flex justify="center" align="center" h-100vh w-100vw>
        <n-result
          status="403"
          title="403 禁止访问"
          description="总有些门是对你关闭的"
        >
          <template v-slot:footer>
            <n-button @click="back">返回首页</n-button>
          </template>
        </n-result>
      </n-flex>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="scss">

</style>
