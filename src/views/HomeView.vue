<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
  <n-flex vertical>
    <n-card>
      <n-flex align="center">
        <n-avatar
          :size="64"
          src="https://images.chuanboyi.com/201705/4ef95d5926.jpg"
          :style="{
                    borderRadius: '5px',
                    backgroundColor: 'red'
                  }"
        />
        <n-flex vertical>
          <span h6 font-900>万事开头难，美好的一天开始了!</span>
          <span h6>加油吧骚年!</span>
        </n-flex>
        <div grow />
        <n-statistic label="统计数据" :value="99">
          <template #prefix>
            <n-icon>
              <icon icon="carbon:save" />
            </n-icon>
          </template>
          <template #suffix>
            / 100
          </template>
        </n-statistic>
        <n-divider />
        <n-timeline>
          <n-timeline-item content="增加登录界面" time="2024/3/3, 22:00" />
          <n-timeline-item content="增加tagsView标签栏、增加主题设置功能" time="2024/3/3, 16:12" />
          <n-timeline-item content="增加异常演示页面" time="2024/2/28, 21:29" />
          <n-timeline-item content="增加列表内容" time="2024/2/28, 20:19" />
          <n-timeline-item content="处理暗黑模式的背景颜色处理，增加普通表格演示。" time="2024/2/28, 01:26" />
          <n-timeline-item content="增加暗黑模式切换" time="2024/2/28, 00:09" />
          <n-timeline-item content="修改默认的菜单栏宽度" time="2024/2/27, 23:22" />
          <n-timeline-item content="Initial commit" time="2024/2/27, 22:59" />
        </n-timeline>
      </n-flex>
    </n-card>
  </n-flex>
</template>
