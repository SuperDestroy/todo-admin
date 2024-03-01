<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { VueDraggable } from 'vue-draggable-plus';
import { cloneDeep } from 'lodash';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const container = ref();
const overflow = ref(false);
const { tagsViewHeight } = storeToRefs(useThemeStore());

const height = computed(() => {
  return `${tagsViewHeight.value}px`;
});
const updateOverflow = () => {
  if (container.value != null) {
    const clientWidth = container.value.$el.clientWidth;
    const scrollWidth = container.value.$el.scrollWidth;
    overflow.value = clientWidth < scrollWidth;
  } else {
    overflow.value = false;
  }
};

onMounted(() => {
  updateOverflow();
});

useResizeObserver(container, () => {
  updateOverflow();
});

const tags = ref(Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Tab ${index}`,
  to: `to ${index}`,
  checked: ref(false)
})));

const closeTag = () => {
  console.log('close tag');
};

const clickTag = (item: any) => {
  // 判断位置是否合适做移动
  moveTag(item);
  tags.value.forEach(item => {
    item.checked = false;
  });
  item.checked = true;
};

const moveTag = (item: any) => {
  const { left, right } = container.value.$el.getBoundingClientRect();
  const { left: tagLeft, right: tagRight } = document.getElementById(`tags-${item.key}`)!.getBoundingClientRect();
  const moveLeft = (left - tagLeft);
  const moveRight = (tagRight - right);
  if (Math.abs(moveLeft) < Math.abs(moveRight) && moveLeft > 0) {
    container.value.$el.scrollTo(container.value.$el.scrollLeft - moveLeft, 0);
  }
  if (Math.abs(moveRight) < Math.abs(moveLeft) && moveRight > 1) {
    container.value.$el.scrollTo(container.value.$el.scrollLeft + moveRight, 0);
  }
};

const leftMove = () => {
  if (container.value.$el.scrollLeft != 0) {
    const containerLeft = container.value.$el.getBoundingClientRect().left;
    const cloneTags = cloneDeep(tags.value).reverse();
    for (let valueElement of cloneTags) {
      const testEL = document.getElementById(`tags-${valueElement.key}`);
      const testElLeft = testEL?.getBoundingClientRect().left;
      if (testElLeft! < containerLeft) {
        container.value.$el.scrollTo(container.value.$el.scrollLeft - (containerLeft - testElLeft!), 0);
        break;
      }
    }
  }
};

const rightMove = () => {
  const el = document.getElementById(`tags-${tags.value[tags.value.length - 1].key}`);
  const containerRight = container.value.$el.getBoundingClientRect().right;
  if (el!.getBoundingClientRect().right > containerRight) {
    for (let valueElement of tags.value) {
      const testEL = document.getElementById(`tags-${valueElement.key}`);
      const testElRight = testEL?.getBoundingClientRect().right;
      if ((testElRight! - containerRight) > 1) {
        container.value.$el.scrollTo(container.value.$el.scrollLeft + (testElRight! - containerRight), 0);
        break;
      }
    }
  }
};


</script>

<template>
  <n-layout-header class="tags-view" bordered>
    <div class="flex px10px py5px">
      <n-button v-if="overflow" @click="leftMove" class="mr8px" text>
        <template v-slot:icon>
          <icon icon="mdi:chevron-left" />
        </template>
      </n-button>
      <n-flex ref="container" :wrap="false" class="flex overflow-hidden w-full scroll-smooth">
        <vue-draggable v-model="tags" mode="list" class="flex gap8px" :animation="150" chosenClass="shadow">
          <n-tag :id="`tags-${item.key}`" class="tag-item" v-for="item in tags" :key="item.key" closable
                 rounded
                 @close="closeTag"
                 @click="clickTag(item)" :type=" item.checked ? 'primary' : 'default'">
            <template #avatar>
              <icon icon="ri:alibaba-cloud-fill" />
            </template>
            <n-flex align="center" :wrap="false">
              <span>{{ item.name }}</span>
            </n-flex>
          </n-tag>
        </vue-draggable>
      </n-flex>
      <n-button v-if="overflow" class="ml8px" text @click="rightMove">
        <template v-slot:icon>
          <icon icon="mdi:chevron-right" />
        </template>
      </n-button>
    </div>
  </n-layout-header>
</template>

<style scoped lang="scss">
.tags-view {
  height: v-bind(height)
}

.tag-item {
  cursor: pointer;
}
</style>
