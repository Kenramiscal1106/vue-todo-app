<script setup lang='ts'>
import type { Category } from '@lib/utils';
import { useCategoryStore, useTodoStore } from '../../lib/stores';
import {trashIcon} from "../icons/index"
const { isActive, value } = defineProps<{
  isActive: boolean,
  value: Category
}>()
const categories = useCategoryStore()
const todos = useTodoStore()
const removeHandler = function() {
  todos.removeItemsByCategory(value.id)
  categories.removeCategory(value.id)/* 
  categories.setId(categories.value[categories.value.length - 2].id)
  // categories.setId(categories.value[categories.value.length - 2].id) */
  
}
</script>
<template>
  <button
    :class="['rounded-md px-2 py-1 text-left flex items-center group', { 'hover:bg-primary active:bg-primary-dark dark:hover:bg-secondary dark:active:bg-secondary-dark': !isActive, 'bg-primary-dark dark:bg-secondary-dark': isActive }]">{{
        value.title
    }} <button class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" v-html="trashIcon" @click="removeHandler"></button></button>
</template>
<style scoped>
</style>