<script setup lang="ts">
  import { onMounted, reactive, ref, watch, type Ref } from 'vue';
  import TodoItems from './components/TodoItems.vue'
  import * as utils from "./lib/utils"
  const currentTimeObj:Ref<utils.Date> = ref(utils.currentTime().hour24);
  const time:Ref<string> = ref(utils.currentTime().hour12.timeString());
  const todoItems = reactive<{value:utils.Todo[]}>({value:[]})
  const selectedTodo = reactive<{value:null | utils.Todo}>({value: null})
  const isValidDeadline:Ref<boolean> = ref(true);
  const todoInput:Ref<string> = ref("")
  const todoDeadline:Ref<string> = ref("");
  const thereIsDeadline = ref<number>(0);
  const DeadlinePattern = /(^(1[0-2]|0?[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig;
  setInterval(async () => {
    time.value = utils.currentTime().hour12.timeString()
    currentTimeObj.value = utils.currentTime().hour24
  }, 200)
  onMounted(() => {
    const todoLocalStorage:string | null = localStorage.getItem('todos');
    if (todoLocalStorage) {
      todoItems.value = JSON.parse(todoLocalStorage)
    }
  })
  function addTodo() {
    if (todoInput.value != "" && isValidDeadline.value) {
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
    else if (!isValidDeadline.value) {
      alert("invalid time format")
      return
    }
    else {
      alert("You haven't entered any 😠")
    }
  }
  watch(todoItems,  () => { 
    localStorage.setItem('todos', JSON.stringify(todoItems.value))
  })
  watch(todoDeadline, () => {
    if (todoDeadline.value.search(DeadlinePattern) !== -1 || todoDeadline.value === "") {
      isValidDeadline.value = true
    } else {
      isValidDeadline.value = false
    }
  })
  watch([todoItems.value, currentTimeObj], () => {
    const sumOfDeadline = todoItems.value.map((todoItem) =>{
      const todoItemInt = utils.pastDeadline(todoItem.deadline, currentTimeObj.value) && !todoItem.done
      if (todoItemInt) {
        return 1
      }
      return 0
    })
    if (sumOfDeadline.length !== 0) {
      thereIsDeadline.value = sumOfDeadline.reduce((prev, next, i, arr):any => {
        return prev + next
      })
      return
    }
    thereIsDeadline.value = 0
  })
  function updateTodo() {
    const todoIds = todoItems.value.map((todoItem) => todoItem.id)
    const selectedTodoIndex = todoIds.indexOf(selectedTodo.value ? selectedTodo.value.id : -1)
    todoItems.value[selectedTodoIndex] = selectedTodo.value ? selectedTodo.value : todoItems.value[selectedTodoIndex - 1]
    todoItems.value = todoItems.value
    selectedTodo.value = null
  }
</script>

<template>
  <main class="p-4">
    <h1>{{time}}</h1>
    <div :class="'fixed top-1 left-[50%] -translate-x-[50%] bg-red-600 text-white px-4 py-2 rounded-md transition-opacity duration-300 ' + (thereIsDeadline === 0 ? ' opacity-0' : '') ">
      <h3>Warning: there are some todos that are past deadline</h3>
      <span v-if="thereIsDeadline > 0">
        <audio autoplay loop>
          <source src="./assets/mixkit-facility-alarm-908.wav" type="audio/wav">
        </audio>
      </span>
    </div>
    <form @submit.prevent="addTodo" autocomplete="off">
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      <button type="submit" class="bg-green-500 hover:bg-green-600 text-white override">add todo</button>
      <br>
      <template v-if="todoDeadline !== ''">
        <label v-if="isValidDeadline">valid</label>
        <label v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </label>
      </template>
    </form>
    <div v-if="selectedTodo.value" class="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-30">
      <form autocomplete="off" @submit.prevent="updateTodo">
        <input type="text" v-model="selectedTodo.value.text">
        <input type="text" v-model="selectedTodo.value.deadline">
        <button type="submit">Update</button>
      </form>
    </div>
    <button @click="() => {todoItems.value = utils.markAllAsUndone(todoItems)}">Mark all as undone</button>
    <button @click="() => {todoItems.value = utils.markAllAsDone(todoItems)}">Mark all as Done</button>
    <button @click="() => {todoItems.value = []}">clear Todo</button>
    <template v-if="todoItems.value.length !== 0">
      <div class="m-2 max-w-[960px] gap-1 flex flex-col">
        <template v-for="todoItem in todoItems.value" :key="todoItem.id">
          <TodoItems v-model:todos="todoItems" v-model:selected-todo="selectedTodo" :specific-todo-item="todoItem" :current-time-ref="currentTimeObj"/>

        </template>
      </div>
    </template>
  </main>
</template>

<style>
</style>
