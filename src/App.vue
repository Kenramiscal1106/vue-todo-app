<script setup lang="ts">
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import TodoItems from './components/TodoItems.vue'
type Todo = {
  deadline:string
  done:boolean
  id:number
  text:string
}
type Date = {
  timeString:Function ;
  hour:number,
  minute:number,
  seconds:number,
  twelveHourSplit?:Function
}
  function currentTime():{hour12:Date, hour24:Date} {
    const time = new Date();
    const hour12:Date = {
      hour: (time.getHours() > 12 ? time.getHours() - 12 : time.getHours() === 0 ? 12 : time.getHours()),
      minute:time.getMinutes(),
      seconds:time.getSeconds(),
      twelveHourSplit:function() {
        return (time.getHours() < 12 ? "AM" : "PM")
      },
      timeString:function() {
        return `${this.hour}:${this.minute < 10 ? `0${this.minute}`: this.minute}:${this.seconds < 10 ? `0${this.seconds}` : this.seconds} ${typeof this.twelveHourSplit !== "undefined" ? this.twelveHourSplit() : ""}`
      }
    }
    const hour24:Date = {
      hour: time.getHours(),
      minute:time.getMinutes(),
      seconds:time.getSeconds(),
      timeString:function() {
        return `${(time.getHours() > 12 ? time.getHours() - 12 : time.getHours())}:${time.getMinutes()}:${time.getSeconds()}`
      }
    }
    return {
      hour12,
      hour24
    }
  }
  const currentTimeObj:Ref<Date> = ref(currentTime().hour24);;
  const time:Ref<string> = ref(currentTime().hour12.timeString());
  setInterval(async () => {
    time.value = currentTime().hour12.timeString()
    currentTimeObj.value = currentTime().hour24
  }, 1000)
  const todoItems = reactive<{value:Todo[]}>({value:[]})
  onMounted(() => {
    const todoLocalStorage:string | null = localStorage.getItem('todos');
    if (todoLocalStorage) {
      todoItems.value = JSON.parse(todoLocalStorage)
    }
  })
  const isValidDeadline:Ref<boolean> = ref(true);
  const todoInput:Ref<string> = ref("")
  const todoDeadline:Ref<string> = ref("")
  const markAllAsUndone = (todoItems: {value:Todo[]}) => {
    return todoItems.value.map((todo:Todo) => {
      return {
        text:todo.text,
        deadline:todo.deadline,
        done:false,
        id:todo.id
      }
    })
  }
  const markAllAsDone = (todoItems: {value: Todo[]}):Todo[] => {
    return todoItems.value.map((todo:Todo) => {
      return {
        text:todo.text,
        deadline:todo.deadline,
        done:true,
        id:todo.id
      }
    })
  }
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
    if (todoDeadline.value.search(/(^(1[0-2]|0?[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig) !== -1 || todoDeadline.value === "") {
      isValidDeadline.value = true
    } else {
      isValidDeadline.value = false
    }
  })
  const message = "valid"
</script>

<template>
  <main class="p-4">
    <h2>{{time}}</h2>
    <form @submit.prevent="addTodo" autocomplete="off">
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      <button type="submit">&plus;</button>
      <br>
      <template v-if="todoDeadline !== ''">
        <label v-if="isValidDeadline">{{message}}</label>
        <label v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </label>
      </template>
    </form>
      <button @click="() => {todoItems.value = markAllAsUndone(todoItems)}">Mark all as undone</button>
      <button @click="() => {todoItems.value = markAllAsDone(todoItems)}">Mark all as Done</button>
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
