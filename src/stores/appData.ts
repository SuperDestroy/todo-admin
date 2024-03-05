import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { findIndex, remove } from 'lodash';
import { type TagModel, type MenuModel } from '@/models';
import { menu } from '@/data/data';

export const useAppDataStore = defineStore('todo-app-data', () => {
  const tags = ref<TagModel[]>([]);
  const activeTag = ref<TagModel>({
    id: '',
    label: '',
    to: '',
    checked: false,
    closeable: false,
    default: false,
    icon: ''
  });
  const menus = ref<any[]>(menu);
  const defaultMenus = computed(() => {
    return menus.value.filter(item => item!.default == true) as MenuModel[];
  });

  function addTag(tag: TagModel) {
    if (findIndex(tags.value, function(o: TagModel) {
      return o.id == tag.id;
    }) == -1) {
      tags.value.push(tag);
    }
    checkTag(tag);
  }

  function removeTag(tag: TagModel) {
    remove(tags.value, function(o: TagModel) {
      return o.id == tag.id;
    });
    if (tag.checked) {
      if (tags.value.length > 0) {
        checkTag(tags.value[0]);
      }
    }
  }

  function checkTag(tag: TagModel) {
    if (tag == undefined) return;
    tags.value.forEach(function(o: TagModel) {
      if (o.id == tag.id) {
        o.checked = true;
        activeTag.value = tag;
      } else {
        if (o.checked) {
          o.checked = false;
        }
      }
    });
  }

  return {
    tags,
    activeTag,
    addTag,
    removeTag,
    checkTag,
    menus,
    defaultMenus
  };

}, {
  persist: {
    paths: ['activeTag'],
    storage: localStorage
  }
});
