<script setup lang='ts'>
import type { Category } from '@lib/utils';
import { ref } from 'vue';
import { useCategoryStore, useTodoStore } from '../../lib/stores';
import { trashIcon, editIcon } from "../icons/index"
const { isActive, value } = defineProps<{
  isActive: boolean,
  value: Category
}>()
const categories = useCategoryStore()
const todos = useTodoStore()
const isEditFocus = ref(false);
const input = ref();
const titleEdit = ref<string>(value.title)
const removeHandler = function () {
  todos.removeItemsByCategory(value.id)
  categories.removeCategory(value.id)
  // categories.setId(categories.value[categories.value.length - 2].id) */

}
const handleEditButton = () => {
  titleEdit.value = value.title
  isEditFocus.value = true;
}
const handleEditSubmit = () => {
  value.title = titleEdit.value
  isEditFocus.value = false
}
const handleEditExit = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() === "escape") {
    isEditFocus.value = false
  }
}
</script>
<template>
  <button v-if="!isEditFocus"
    class='border-2 border-transparent rounded-md px-2 py-1 text-left flex gap-2 items-center group'
    :class="{ 'hover:bg-primary active:bg-primary-dark dark:hover:bg-secondary dark:active:bg-secondary-dark': !isActive, 'bg-primary-dark dark:bg-secondary-dark': isActive }">{{
        value.title
    }}
    <button
      class="text-gray-700 hover:text-primary dark:text-secondary-accent dark:hover:text-secondary ml-auto opacity-0 group-hover:opacity-100 transition-all"
      v-html="editIcon" @click="handleEditButton"></button>
    <button
      class="text-gray-700 hover:text-primary dark:text-secondary-accent  dark:hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"
      v-html="trashIcon" @click="removeHandler"></button></button>
  <form v-else autocomplete="off" @submit.prevent="handleEditSubmit" class=' px-2 py-1 rounded-md border-2' :class="{
    'border-red-500': value.title === '',
    'dark:border-secondary border-primary': value.title !== '',
  }">
    <input @keydown="handleEditExit" type="text" name="title" id="" placeholder="Enter category name..."
      class="block bg-transparent outline-none dark:text-white" v-model="titleEdit" ref="input" />
  </form>
</template>
<style scoped>
</style>