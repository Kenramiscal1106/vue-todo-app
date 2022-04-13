<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, type Ref } from 'vue';
import TodoVue from './components/Todo.vue';

  const todo:Ref<string> = ref("some todo");
  onMounted(() => {
    const todoLocalStorage = localStorage.getItem('todo')
    if (todoLocalStorage && typeof todoLocalStorage === "string") {
      todo.value = todoLocalStorage;
    }
  })
  watch(todo, () => {
    localStorage.setItem('todo', todo.value)
  })
  function updateTodo(todos:string) {
    todo.value = todos
  }
  function todos() {
    return todo
  }
</script>

<template>
  <main>
    <button @click="() => {updateTodo('todos')}">
      {{todo}}
      <TodoVue :todo="todo" :todoRef="todos()"/>
    </button>
  </main>
</template>

<style>
</style>
