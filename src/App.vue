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
      hour: (time.getHours() > 12 ? time.getHours() - 12 : time.getHours()),
      minute:time.getMinutes(),
      seconds:time.getSeconds(),
      twelveHourSplit:function() {
        return (time.getHours() > 12 ? "PM" : "AM")
      },
      timeString:function() {
        return `${(time.getHours() > 12 ? time.getHours() - 12 : time.getHours())}:${time.getMinutes()}:${time.getSeconds()} ${typeof this.twelveHourSplit !== "undefined" ? this.twelveHourSplit() : ""}`
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
  const time:Ref<string> = ref(currentTime().hour12.timeString());
  setInterval(async () => {
    time.value = currentTime().hour12.timeString()
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
  function toggleDone(todoItemsArray:Todo[], todoItem:Todo):void {
   todoItems.value =todoItemsArray.map((item) => {
      if (item.id === todoItem.id) {
        return {
          id:item.id,
          done:!todoItem.done,
          text:item.text,
          deadline:item.deadline
        }
      }
      return item 
    })
  }
  function removeTodo(todoItemsArray:Todo[], todoItem:Todo):void {
    todoItems.value = todoItemsArray.filter((item) => item.id !== todoItem.id)
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
  function pastDeadline(todoDeadline:string, currentTime:Date):boolean {
    if (todoDeadline === "") {
      return false
    }
    function convertTo24HourFormat(todoDeadline:string):string {
      const AMorPM = todoDeadline.match(/(A|P)/gi)?.join()
      const removedAMPM = todoDeadline.replace(/(A|P)m$/gi, '');
      const time = removedAMPM.match(/\d+/gi)
      let hour, minute
      if (time && typeof AMorPM !== 'undefined') {
        hour = parseInt(time[0]);
        minute = time[1]
        hour = (AMorPM.toLowerCase() === 'p' && hour !== 12 ? hour + 12 : hour)
      } else {
        throw new Error('Parsing error')
      }
      return `${hour}:${minute}`
    }
    function decompose(todoDeadline:string):{hour:number, minute:number, totalMinutes:number} {
      let hour, minute;
      const hourMinuteArray= todoDeadline.match(/\d+/gi)
      if (hourMinuteArray) {
        [hour, minute] = hourMinuteArray
      }
      if (typeof hour !== 'undefined' && typeof minute !== "undefined") {
        const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
        return {
          hour:parseInt(hour),
          minute:parseInt(minute),
          totalMinutes
        }
      } 
      return {
        hour:NaN,
        minute:NaN,
        totalMinutes:NaN
      }
    }
    const convertedFormat = (todoDeadline.search(/(A|P)m$/gi) !== -1 ? convertTo24HourFormat(todoDeadline) : todoDeadline)
    const decomposeConvertedFormat = decompose(convertedFormat)
    if ((currentTime.hour * 60) + currentTime.minute >= decomposeConvertedFormat.totalMinutes) {
      return true
    }
    return false
  }
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
          <TodoItems v-model:todos="todoItems" :specific-todo-item="todoItem"/>
            <button :class="`flex-1 text-left mark-as-done-button todo-item ${todoItem.done ? 'todo-is-done ' : ''}`" @click="toggleDone(todoItems.value, todoItem)">
              <input type="checkbox" name="" id="" v-model="todoItem.done">{{todoItem.text}} 
              <div class="todo-item-side">
                <span v-if="pastDeadline(todoItem.deadline, currentTime().hour24) && !todoItem.done" class="text-red-600 flex items-center ml-auto"><img src="./assets/alarm.svg" alt=""> 
                  Past due Date
                  <audio autoplay loop><source src="./assets/mixkit-facility-alarm-908.wav" type="audio/wav"/></audio>
                </span>
                <span v-if="todoItem.deadline !== ''">Deadline: {{todoItem.deadline}}</span>
                <span class="option-buttons">
                  <button @click="removeTodo(todoItems.value, todoItem)" class="remove-button">
                    <svg width="14" height="14" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.2306 33.2306L3.76933 3.76936M3.76933 33.2306L33.2306 3.76936" stroke="currentColor" stroke-width="7"/>
    </svg>
                  </button>
                  <button>
                    <svg width="14" height="14" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7.5" cy="18.5" r="4.5" fill="currentColor"/>
                      <circle cx="18.5" cy="18.5" r="4.5" fill="currentColor"/>
                      <circle cx="29.5" cy="18.5" r="4.5" fill="currentColor"/> 
                    </svg>
                  </button>
                </span>
            </div>
            </button>

        </template>
      </div>
    </template>
  </main>
</template>

<style>
</style>
