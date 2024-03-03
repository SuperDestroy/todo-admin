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
      <n-flex justify="center" align="center" h-full w-full>
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
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
