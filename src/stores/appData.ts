import { defineStore } from 'pinia';
import { ref } from 'vue';
import { findIndex, remove } from 'lodash';

export const useAppDataStore = defineStore('todo-app-data', () => {
  const tags = ref<TagModel[]>([]);
  const activeTag = ref<TagModel>({
    key: '',
    label: '',
    to: '',
    checked: false,
    closeable: false,
    default: false
  });

  function addTag(tag: TagModel) {
    if (findIndex(tags.value, function(o: TagModel) {
      return o.key == tag.key;
    }) == -1) {
      tags.value.push(tag);
    }
    checkTag(tag);
  }

  function removeTag(tag: TagModel) {
    remove(tags.value, function(o: TagModel) {
      return o.key == tag.key;
    });
    if (tag.checked) {
      if (tags.value.length > 0) {
        checkTag(tags.value[0]);
      }
    }
  }

  function checkTag(tag: TagModel) {
    tags.value.forEach(function(o: TagModel) {
      if (o.key == tag.key) {
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
    checkTag
  };

});
