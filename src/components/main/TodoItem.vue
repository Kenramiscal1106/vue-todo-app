<script setup lang='ts'>
import { useTodoStore } from '../../lib/stores';
import type { Todo } from '@lib/utils';
import { watch } from 'vue';
  const todos = useTodoStore()
  watch(todos, () => {
    console.log(todos.value)
  })
  const {todo} = defineProps<{todo:Todo}>()
</script>

<template>
  <div class="flex gap-2 p-2 items-center">
    <input type="checkbox" v-model="todo.done" >
    <div>
      <div>{{todo.text}}</div>
    </div>
    <button class="p-1 border-red-500 hover:bg-red-600 active:bg-red-700 transition-colors border-2 group" @click="todos.$patch({value: todos.value.filter(todoStore => todoStore.id !== todo.id)})">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.68306 3.56694C2.43898 3.32286 2.43898 2.92714 2.68306 2.68306C2.92714 2.43898 3.32287 2.43898 3.56694 2.68306L10 9.11612L16.4331 2.68306C16.6771 2.43898 17.0729 2.43898 17.3169 2.68306C17.561 2.92714 17.561 3.32286 17.3169 3.56694L10.8839 10L17.3169 16.4331C17.561 16.6771 17.561 17.0729 17.3169 17.3169C17.0729 17.561 16.6771 17.561 16.4331 17.3169L10 10.8839L3.56694 17.3169C3.32287 17.561 2.92714 17.561 2.68306 17.3169C2.43898 17.0729 2.43898 16.6771 2.68306 16.4331L9.11612 10L2.68306 3.56694Z" class="fill-red-500 group-hover:fill-white transition-colors"/>
      </svg>
      
    </button>
  </div>  
</template>
<style scoped>
  
</style>