<script setup lang="ts">
import type { Todo } from '@/lib/utils';
import TodoItem from './TodoItem.vue';
import SadFace from './icons/SadFace.vue';

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
  <div v-if="todoItems.value.length !== 0" class="px-2">
    <template v-for="todoItem in todoItems.value" :key="todoItem.id">
      <TodoItem v-model:todos="todoItems" v-model:selected-todo="selectedTodo" :specific-todo-item="todoItem"
              :current-time-ref="currentTimeObj" />
    </template>
  </div>
  <div v-else>
    <div>
      <div>
        <span class="m-auto block w-max">
          <SadFace height="160" width="160"/>
        </span>
      </div>
      Ooops, it appears that there are no todos.
    </div>
  </div>
</template>
