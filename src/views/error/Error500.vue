<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const back = () => {
  router.replace('/');
};
</script>

<template>
  <n-layout h-full w-full>
    <n-layout-content>
      <n-flex justify="center" align="center">
        <n-result
          status="500"
          title="500 服务器错误"
          description="服务器出错可能说明该雇更多程序员了"
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
