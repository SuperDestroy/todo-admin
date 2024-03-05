<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, h, nextTick, onMounted, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { VueDraggable } from 'vue-draggable-plus';
import { cloneDeep } from 'lodash';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '@/stores/appData';
import { useRouter } from 'vue-router';
import { type TagModel } from '@/models';
import eventBus from '@/utils/EventBus';
import { NButton, NIcon } from 'naive-ui';

withDefaults(defineProps<{
  isFullScreen: boolean
}>(), {
  isFullScreen: false
});


const container = ref();
const overflow = ref(false);
const { tagsViewHeight, showTagIcon } = storeToRefs(useThemeStore());
const appDataStore = useAppDataStore();
const { tags, activeTag, defaultMenus } = storeToRefs(appDataStore);
const { removeTag, checkTag } = appDataStore;
const router = useRouter();

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

const init = () => {
  if (container.value != null) {
    if (tags.value.length == 0) {
      defaultMenus.value.forEach(item => {
        tags.value.push({
          id: item.id,
          label: item.name,
          to: item.to,
          checked: false,
          default: item.default,
          closeable: !item.default,
          icon: item.iconStr
        });
      });
      if (activeTag.value.id.length > 0 && !activeTag.value.default) {
        tags.value.push(activeTag.value);
      }
      if (tags.value.length > 0) {
        checkTag(tags.value[tags.value.length - 1]);
      }
    }
  }
};

onMounted(() => {
  init();
  updateOverflow();
});

useResizeObserver(container, () => {
  updateOverflow();
});

const closeTag = (item: any) => {
  removeTag(item);
};

const clickTag = (item: any) => {
  checkTag(item);
  moveTag(item);
};

watch(tags.value, () => {
  nextTick(() => {
    updateOverflow();
  });
});

watch(activeTag, (value: TagModel) => {
  if (value.to.length > 0 && value.to != router.currentRoute.value.fullPath) {
    router.push({
      path: value.to
    });
  }
});

const moveTag = (item: any) => {
  const { left, right } = container.value.$el.getBoundingClientRect();
  const { left: tagLeft, right: tagRight } = document.getElementById(`tags-${item.id}`)!.getBoundingClientRect();
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
      const testEL = document.getElementById(`tags-${valueElement.id}`);
      const testElLeft = testEL?.getBoundingClientRect().left;
      if (testElLeft! < containerLeft) {
        container.value.$el.scrollTo(container.value.$el.scrollLeft - (containerLeft - testElLeft!), 0);
        break;
      }
    }
  }
};

const rightMove = () => {
  const el = document.getElementById(`tags-${tags.value[tags.value.length - 1].id}`);
  const containerRight = container.value.$el.getBoundingClientRect().right;
  if (el!.getBoundingClientRect().right > containerRight) {
    for (let valueElement of tags.value) {
      const testEL = document.getElementById(`tags-${valueElement.id}`);
      const testElRight = testEL?.getBoundingClientRect().right;
      if ((testElRight! - containerRight) > 1) {
        container.value.$el.scrollTo(container.value.$el.scrollLeft + (testElRight! - containerRight), 0);
        break;
      }
    }
  }
};

const refresh = () => {
  eventBus.emit('RefreshContent');
};

const fullScreen = () => {
  eventBus.emit('FullScreenContent');
};

const showDropdownRef = ref(false);
let showMenuItem: TagModel;
const xRef = ref(0);
const yRef = ref(0);
const options = [
  {
    label: '关闭',
    key: 'me',
    disabled: false,
    iconStr: 'material-symbols:close-small-outline-rounded'
  },
  {
    label: '关闭其他',
    key: 'other',
    disabled: false,
    iconStr: 'material-symbols:check-indeterminate-small'
  },
  {
    label: '关闭左侧',
    key: 'left',
    disabled: false,
    iconStr: 'material-symbols-light:align-horizontal-left-rounded'
  },
  {
    label: '关闭右侧',
    key: 'right',
    disabled: false,
    iconStr: 'material-symbols-light:align-horizontal-right-rounded'
  },
  {
    label: '关闭所有',
    key: 'all',
    disabled: false,
    iconStr: 'material-symbols:clear-all'
  }
];
const onContextMenu = (e: MouseEvent, item: TagModel) => {
  showDropdownRef.value = false;
  nextTick().then(() => {
    showMenuItem = item;
    options[0].disabled = item.default;
    options[1].disabled = tags.value.length == 1;
    options[2].disabled = item.id == tags.value[0].id;
    options[3].disabled = item.id == tags.value[tags.value.length - 1].id;
    options[4].disabled = tags.value.length == 1;
    showDropdownRef.value = true;
    xRef.value = e.clientX;
    yRef.value = e.clientY;
  });
};

const onClickOutSide = () => {
  showDropdownRef.value = false;
};

const handleSelect = (key: string) => {
  if (key == 'me') {
    showDropdownRef.value = false;
    nextTick(() => {
      closeTag(showMenuItem);
    });
  } else if (key == 'other') {
    showDropdownRef.value = false;
    nextTick(() => {
      const filter = tags.value.filter(item => !item.default && item.id != showMenuItem.id);
      filter.forEach(item => {
        closeTag(item);
      });
    });
  } else if (key == 'all') {
    showDropdownRef.value = false;
    nextTick(() => {
      const filter = tags.value.filter(item => !item.default);
      filter.forEach(item => {
        closeTag(item);
      });
    });
  } else {
    showDropdownRef.value = false;
    nextTick(() => {
      const cloneTags = cloneDeep(tags.value);
      if (key == 'right') {
        cloneTags.reverse();
      }
      for (let cloneTag of cloneTags) {
        if (cloneTag.id == showMenuItem.id) break;
        if (!cloneTag.default) {
          closeTag(cloneTag);
        }
      }
    });
  }
};

const renderMenuIcon = (option: any) => {
  return h(NIcon, null, () => h(Icon, { icon: option.iconStr }));
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
      <n-flex ref="container" :wrap="false" class="flex overflow-hidden w-full scroll-smooth items-center">
        <vue-draggable v-model="tags" mode="list" class="flex gap8px" :animation="150" chosenClass="shadow">
          <n-tag :id="`tags-${item.id}`" class="tag-item" v-for="item in tags" :key="item.key"
                 :closable="!item.default"
                 rounded
                 @close="closeTag(item)"
                 @click="clickTag(item)"
                 :type=" item.checked ? 'primary' : 'default'"
                 @contextmenu.prevent="(e: MouseEvent) => onContextMenu(e,item)">
            <template v-if="showTagIcon" #icon>
              <icon :icon="item.icon" />
            </template>
            <n-flex align="center" :wrap="false">
              <span>{{ item.label }}</span>
            </n-flex>
          </n-tag>
        </vue-draggable>
      </n-flex>
      <n-button v-if="overflow" class="ml8px" text @click="rightMove">
        <template v-slot:icon>
          <icon icon="mdi:chevron-right" />
        </template>
      </n-button>
      <n-button @click="refresh" quaternary :focusable="false">
        <template v-slot:icon>
          <icon icon="ic:baseline-refresh" />
        </template>
      </n-button>
      <n-button @click="fullScreen" quaternary :focusable="false">
        <template v-slot:icon>
          <icon v-if="isFullScreen" icon="material-symbols:fullscreen-exit" />
          <icon v-else icon="material-symbols:fullscreen" />
        </template>
      </n-button>
    </div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="options"
      :show="showDropdownRef"
      :on-clickoutside="onClickOutSide"
      :render-icon="renderMenuIcon"
      @select="handleSelect"
    />
  </n-layout-header>
</template>

<style scoped lang="scss">
.tags-view {
  height: v-bind(height)
}

.tag-item {
  cursor: pointer;
  height: 34px;
}
</style>
