<script setup lang="ts">
  import { onMounted, ref, watch, type Ref } from 'vue';
type todos = {
  deadline?:string
  done:boolean
  id:number
  text:string
}
type date = {
  timeString:string;
  hour:number,
  minute:number,
  seconds:number
}
  function currentTime():{[key:string]:date} {
    const time = new Date();
    const hour12:date = {
      hour: (time.getHours() > 12 ? time.getHours() - 12 : time.getHours()),
      minute:time.getMinutes(),
      seconds:time.getSeconds(),
      timeString:`${(time.getHours() > 12 ? time.getHours() - 12 : time.getHours())}:${time.getMinutes()}:${time.getSeconds()}`
    }
    const hour24:date = {
      hour: time.getHours(),
      minute:time.getMinutes(),
      seconds:time.getSeconds(),
      timeString:`${(time.getHours() > 12 ? time.getHours() - 12 : time.getHours())}:${time.getMinutes()}:${time.getSeconds()}`
    }
    return {
      hour12,
      hour24
    }
  }
  const time:Ref<string> = ref(currentTime().hour12.timeString);
  setInterval(async () => {
    time.value = currentTime().hour12.timeString
  }, 1000)
  const todoItems:Ref<todos[]> = ref([])
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
  watch(todoDeadline, () => {
    if (todoDeadline.value.search(/(^(1[0-2]|[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig) !== -1 || todoDeadline.value === "") {
      isValidDeadline.value = true
    } else {
      isValidDeadline.value = false
    }
  })
  const message = "valid"
</script>

<template>
  <h2>{{time}}</h2>
  <main>
    <form @submit.prevent="addTodo" autocomplete="off">
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      <template v-if="todoDeadline !== ''">
        <label v-if="isValidDeadline">{{message}}</label>
        <label v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </label>
      </template>
      <button type="submit">&plus;</button>
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
