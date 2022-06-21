<script setup lang="ts">
import type { Todo } from '@/lib/utils';
import TodoItem from './TodoItem.vue';

const {todoItems,selectedTodo, currentTimeObj} = defineProps<{
  todoItems: {
    value: Todo[]
  },
  selectedTodo: {
    value: Todo | null
  },
  currentTimeObj: {
    [key:string]:any
  }
}>()
</script>


<template>
  <div class="" v-if="todoItems.value.length !== 0" v-for="todoItem in todoItems.value" :key="todoItem.id">
    <TodoItem v-model:todos="todoItems" v-model:selected-todo="selectedTodo" :specific-todo-item="todoItem"
            :current-time-ref="currentTimeObj" />
  </div>
</template>
