<script setup lang="ts">
  import { onMounted, ref, watch, type Ref } from 'vue';
type todos = {
  deadline?:string
  done:boolean
  id:number
  text:string
}
  const todoItems:Ref<todos[]> = ref([])
  onMounted(() => {
    const todoLocalStorage:string | null = localStorage.getItem('todos');
    if (todoLocalStorage) {
      todoItems.value = JSON.parse(todoLocalStorage)
    }
  })
  
  const todoInput:Ref<string> = ref("")
  const todoDeadline:Ref<string> = ref("")
  function addTodo() {
    if (todoInput.value != "") {
      todoItems.value = [...todoItems.value, {
          done:false,
          id:Math.random() *1000,
          text:todoInput.value,
          deadline:todoDeadline.value
        }] 
      todoInput.value = ''
      todoDeadline.value = ""
      return
    }
    alert("you haven't entered an input")
  }
  function toggleDone(todoItemsArray:todos[], todoItem:todos):void {
   todoItems.value =todoItemsArray.map((item) => {
      if (item.id === todoItem.id) {
        return {
          id:item.id,
          done:!todoItem.done,
          text:item.text
        }
      }
      return item 
    })
    todoItems.value = todoItems.value
  }
  function removeTodo(todoItemsArray:todos[], todoItem:todos):void {
    todoItems.value = todoItemsArray.filter((item) => item.id !== todoItem.id)
  }
  watch(todoItems,  () => { 
    localStorage.setItem('todos', JSON.stringify(todoItems.value))
  })
</script>

<template>
  <main>
    <form @submit.prevent="addTodo">
      <label for="text">Todo:</label><br>
      <input type="text" v-model="todoInput" id="text"><br>
      <label for="deadline">Due:</label><br>
      <input type="text" id="deadline" v-model="todoDeadline">
      <button type="submit">Submit</button>
    </form>
      <button @click="() => {todoItems = []}">clear Todos</button>

    <div v-if="todoItems.length !== 0">
      <div v-for="todoItem in todoItems" :key="todoItem.id">
        <div>
          <p>{{todoItem.text}}</p><button @click="() => {toggleDone(todoItems, todoItem)}">{{todoItem.done ? "undo" : "mark as done"}}</button> <button @click="removeTodo(todoItems, todoItem)">Remove</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>There are no todos</p>
    </div>
  </main>
</template>

<style>
</style>
