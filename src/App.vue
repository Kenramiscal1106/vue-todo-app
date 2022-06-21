<script setup lang="ts">
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoItems from './components/TodoItems.vue'
import Modal from './components/Modal.vue'
import * as utils from "./lib/utils"
const currentTimeObj: Ref<utils.Date> = ref(utils.currentTime().hour24);
const time: Ref<string> = ref(utils.currentTime().hour12.timeString());
const todoItems = reactive<{ value: utils.Todo[] }>({ value: [] })
const selectedTodo = reactive<{ value: null | utils.Todo }>({ value: null })
const thereIsDeadline = ref<number>(0);
const modalOpen = ref<boolean>(false)
setInterval(async () => {
  time.value = utils.currentTime().hour12.timeString()
  currentTimeObj.value = utils.currentTime().hour24
}, 200)
onMounted(() => {
  const todoLocalStorage: string | null = localStorage.getItem('todos');
  if (todoLocalStorage) {
    todoItems.value = JSON.parse(todoLocalStorage)
  }
})
watch(todoItems, () => {
  localStorage.setItem('todos', JSON.stringify(todoItems.value))
})
watch([todoItems.value, currentTimeObj], () => {
  const sumOfDeadline = todoItems.value.map((todoItem) => {
    const todoItemInt = utils.pastDeadline(todoItem.deadline, currentTimeObj.value) && !todoItem.done
    if (todoItemInt) {
      return 1
    }
    return 0
  })
  if (sumOfDeadline.length !== 0) {
    thereIsDeadline.value = sumOfDeadline.reduce((prev, next, i, arr): any => {
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
  <main class="content">
    <h1>{{ time }}</h1>
    <Modal v-if="modalOpen">
      <TodoForm v-model:todo-items="todoItems" />
    </Modal><!-- 
    <button @click="() => modalOpen = !modalOpen" v-if="modalOpen" class="absolute right-4 top-4 bg-slate-600 hover:bg-slate-900 text-white p-2 z-40">Close add todo</button> -->
    <!-- <div
      class="">
      <h3>Warning: there are some todos that are past deadline</h3>
      <span v-if="thereIsDeadline > 0">
        <audio autoplay loop>
          <source src="./assets/mixkit-facility-alarm-908.wav" type="audio/wav">
        </audio>
      </span>
    </div>
    <div v-if="selectedTodo.value"
      class="">
      <form autocomplete="off" @submit.prevent="updateTodo">
        <input type="text" v-model="selectedTodo.value.text">
        <input type="text" v-model="selectedTodo.value.deadline">
        <button type="submit">Update</button>
      </form>
    </div>
    <div>
      <button @click="() => { todoItems.value = utils.markAllAsUndone(todoItems) }">Mark all as undone</button>
      <button @click="() => { todoItems.value = utils.markAllAsDone(todoItems) }">Mark all as Done</button>
      <button @click="() => { todoItems.value = [] }">clear Todo</button>
    </div> -->
    <TodoItems :current-time-obj="currentTimeObj" v-model:todo-items="todoItems" v-model:selected-todo="selectedTodo"/>
    <div class="flex gap-4 fixed bottom-2 right-2">
      <button @click="() => modalOpen = !modalOpen" class="">Create todo</button>
    </div>
  </main>
</template>
<style lang="scss" scoped>
  main.content {
    font-family: "Open Sans", Montserrat, sans-serif;
    max-width: 49rem;
    margin:auto;
    > * {
      text-align:center;
    }
  }
</style>