<script setup lang="ts">
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoItems from './components/TodoItems.vue'
import Modal from './components/Modal.vue'
import * as utils from "./lib/utils"
import ClearIcon from "./components/icons/ClearIcon.vue"
import PlusIcon from "./components/icons/PlusIcon.vue"
import CheckIcon from "./components/icons/CheckIcon.vue"
import ResetIcon from "./components/icons/ResetIcon.vue"
import Tooltip from "./components/Tooltip.vue"
const currentTimeObj: Ref<utils.Date> = ref(utils.currentTime().hour24);
const time: Ref<string> = ref(utils.currentTime().hour12.timeString());
const todoItems = reactive<{ value: utils.Todo[] }>({ value: [] })
const selectedTodo = reactive<{ value: null | utils.Todo }>({ value: null })
const thereIsDeadline = ref<number>(0);
const modalOpen = reactive({value: false})
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
window.addEventListener("keyup", (e) =>{
  if (e.key === "Escape") {
    if (modalOpen.value) {
      modalOpen.value = false
    }
  }
})
</script>

<template>
  <main class="content">
    <h1>{{ time }}</h1>
    <Modal v-if="modalOpen.value" v-model:modal-open="modalOpen">
      <TodoForm v-model:todo-items="todoItems" v-model:modal-open="modalOpen"/>
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
    </div>-->
    <TodoItems :current-time-obj="currentTimeObj" v-model:todo-items="todoItems" v-model:selected-todo="selectedTodo"/>
    <div class="button-container">
      <Tooltip :tooltip-message='"Reset all todos"' :position="'top'">
        <button @click="() => { todoItems.value = utils.markAllAsUndone(todoItems) }"><ResetIcon height="20" width="20"/></button>
      </Tooltip>
      <Tooltip tooltip-message="Mark all as done" position="top">
        <button @click="() => { todoItems.value = utils.markAllAsDone(todoItems) }"><CheckIcon height="20" width="20"/></button>
      </Tooltip>
      <Tooltip tooltip-message="Clear all todos" position="top">
        <button @click="() => { todoItems.value = [] }"><ClearIcon height="20" width="20"/></button>
      </Tooltip>
      <button @click="() => modalOpen.value = true" class=""><PlusIcon height="20" width="20"/> Add Todo</button>
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
  div.button-container {
    @apply flex
    gap-3
    fixed
    bottom-2
    right-2 items-center;
    button {
      @apply 
      bg-gray-100
      text-black
      p-2
      hover:bg-gray-300 flex items-center gap-2;
    }
  } 
</style>