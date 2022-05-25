<script setup lang="ts">
  import { onMounted, reactive, ref, watch, type Ref } from 'vue';
  import TodoItems from './components/TodoItems.vue'
  import * as utils from "./lib/utils"
  const currentTimeObj:Ref<utils.Date> = ref(utils.currentTime().hour24);;
  const time:Ref<string> = ref(utils.currentTime().hour12.timeString());
  setInterval(async () => {
    time.value = utils.currentTime().hour12.timeString()
    currentTimeObj.value = utils.currentTime().hour24
  }, 1000)
  const todoItems = reactive<{value:utils.Todo[]}>({value:[]})
  onMounted(() => {
    const todoLocalStorage:string | null = localStorage.getItem('todos');
    if (todoLocalStorage) {
      todoItems.value = JSON.parse(todoLocalStorage)
    }
  })
  const isValidDeadline:Ref<boolean> = ref(true);
  const todoInput:Ref<string> = ref("")
  const todoDeadline:Ref<string> = ref("")
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
  const DeadlinePattern = /(^(1[0-2]|0?[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig;
  watch(todoDeadline, () => {
    if (todoDeadline.value.search(DeadlinePattern) !== -1 || todoDeadline.value === "") {
      isValidDeadline.value = true
    } else {
      isValidDeadline.value = false
    }
  })
</script>

<template>
  <main class="p-4">
    <h2>{{time}}</h2>
    <!-- <span
        v-if="thereIsADeadline"
        class="text-red-600 flex items-center ml-auto"
        ><img src="./../assets/alarm.svg" alt="" />
        Past due Date
        <audio autoplay loop>
          <source
            src="./assets/mixkit-facility-alarm-908.wav"
            type="audio/wav"
          />
        </audio>
      </span> -->
    <form @submit.prevent="addTodo" autocomplete="off">
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      <button type="submit">&plus;</button>
      <br>
      <template v-if="todoDeadline !== ''">
        <label v-if="isValidDeadline">valid</label>
        <label v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </label>
      </template>
    </form>
    <button @click="() => {todoItems.value = utils.markAllAsUndone(todoItems)}">Mark all as undone</button>
    <button @click="() => {todoItems.value = utils.markAllAsDone(todoItems)}">Mark all as Done</button>
    <button @click="() => {todoItems.value = []}">clear Todo</button>
    <template v-if="todoItems.value.length !== 0">
      <div class="m-2 max-w-[960px] gap-1 flex flex-col">
        <template v-for="todoItem in todoItems.value" :key="todoItem.id">
          <TodoItems v-model:todos="todoItems" :specific-todo-item="todoItem" :current-time-ref="currentTimeObj"/>

        </template>
      </div>
    </template>
  </main>
</template>

<style>
</style>
