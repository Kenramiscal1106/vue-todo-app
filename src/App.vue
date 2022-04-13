<script setup lang="ts">
  import { onMounted, ref, watch, watchEffect, type Ref } from 'vue';
type todos = {
  deadline?:string
  done:boolean
  id:number
  text:string
}
  const todoItems:Ref<todos[] | []> = ref([])
  onMounted(() => {
    const todoLocalStorage:string | null = localStorage.getItem('todos');
    if (todoLocalStorage) {
      todoItems.value = JSON.parse(todoLocalStorage)
    }
  })
  watch(todoItems, () => {
    localStorage.setItem('todos', JSON.stringify(todoItems.value))
  })
  const todoInput:Ref<string> = ref("")
  function addTodo() {
    todoItems.value = [
      ...todoItems.value, {
        done:false,
        id:Math.random() *1000,
        text:todoInput.value
      }
    ]
  }
</script>

<template>
  <main>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="todoInput"><button type="submit">Submit</button>
    </form>
    <div v-if="todoItems.length !== 0">
      <div v-for="todoItem in todoItems">
        <p>{{todoItem.text}}</p>
      </div>
    </div>
    <div v-else>
      <p>There are no todos</p>
    </div>
  </main>
</template>

<style>
</style>
