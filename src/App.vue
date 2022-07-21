<script setup lang="ts">
import { useCurrentTime, useLocalStorage } from './lib/get';
import type { Date } from './lib/utils';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useCategoryStore, useTodoStore } from './lib/stores';
import Sidebar from './components/Sidebar.vue';
import Main from './components/Main.vue';
import AddCategory from './components/sidebar/AddCategory.vue';
import Category from './components/sidebar/Category.vue';
import TodoItem from './components/main/TodoItem.vue';
import {v4 as randomUUID} from 'uuid'

const categories = useCategoryStore()
const todos = useTodoStore()

const categoryStore = useLocalStorage('categories')
const todoStore = useLocalStorage('todos')
onMounted(() => {
  if (!categoryStore.value) {
    console.log("no localstorage copy")
    categories.$reset()
    return
  }
  categories.$patch({value: JSON.parse(categoryStore.value)})
})
onMounted(() => {
  if (!todoStore.value) {
    console.log("no localstorage copy")
    todos.$reset()
    return
  }
  todos.$patch({value: JSON.parse(todoStore.value)}) 
  
})
watch(todos, () => {
  console.log(todos.value)
  todoStore.set(JSON.stringify(todos.value))
})

const currentTimeObj: Ref<Date> = ref(useCurrentTime().hour24);
setInterval(() => [
  currentTimeObj.value = useCurrentTime().hour24
], 1000)
/* const currentTimeObj: Ref<utils.Date> = ref(utils.currentTime().hour24);
const time: Ref<string> = ref(utils.currentTime().hour12.timeString());
const todoItems = reactive<{ value: utils.Todo[] }>({ value: [] })
const selectedTodo = reactive<{ value: null | utils.Todo }>({ value: null })
const thereIsDeadline = ref<number>(0);
const todoFormVisible = reactive({ value: false })
const clearTodoVisible = reactive({ value: false })
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
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    if (todoFormVisible.value) {
      todoFormVisible.value = false
    }
  }
}) */
</script>
<template>
  <!--<main class="content">
    <h1 class="text-center">{{ time }}</h1>
    <Modal v-if="todoFormVisible.value" v-model:modal-open="todoFormVisible">
      <TodoForm v-model:todo-items="todoItems" v-model:modal-open="todoFormVisible" />
    </Modal>
    <Modal v-model:modal-open="clearTodoVisible" v-if="clearTodoVisible.value">
      <div @click.stop="" class="bg-gray-200 p-4">
        Are you sure you want to delete all todos?
        <div class="flex space-x-3">
          <button @click="clearTodoVisible.value = false" class="p-3 bg-black bg-opacity-20">cancel</button>
          <button
            @click="todoItems.value = []; clearTodoVisible.value = false" class="px-4 py-3 bg-red-500 hover:bg-red-700 text-white">Yes</button>
        </div>
      </div>
    </Modal>
     
    <button @click="() => todoFormVisible = !todoFormVisible" v-if="todoFormVisible" class="absolute right-4 top-4 bg-slate-600 hover:bg-slate-900 text-white p-2 z-40">Close add todo</button>
     <div
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
    <TodoItems :current-time-obj="currentTimeObj" v-model:todo-items="todoItems" v-model:selected-todo="selectedTodo" />
    <div class="button-container">
      <Tooltip :tooltip-message='"Reset all todos"' :position="'top'">
        <button @click="() => { todoItems.value = utils.markAllAsUndone(todoItems) }">
          <reset-icon height="20" width="20" />
        </button>
      </Tooltip>
      <Tooltip tooltip-message="Mark all as done" position="top">
        <button @click="() => { todoItems.value = utils.markAllAsDone(todoItems) }">
          <check-icon height="20" width="20" />
        </button>
      </Tooltip>
      <Tooltip tooltip-message="Clear all todos" position="top">
        <button @click="() => { clearTodoVisible.value = true }">
          <clear-icon height="20" width="20" />
        </button>
      </Tooltip>
      <button @click="() => todoFormVisible.value = true" class="">
        <plus-icon height="20" width="20" /> Add Todo
      </button>
    </div>
  </main>-->
  <div class="flex items-stretch w-full h-full">
    <Sidebar :time="currentTimeObj.timeString()">
      <Category v-for="category in categories.value" :key="category.id">
        {{category.title}}
      </Category>
      <AddCategory>Add Category</AddCategory>
    </Sidebar>
    <Main>
      <button @click="todos.$patch({value: []})">Clear all todos</button>
      <button @click="todos.$patch({value: [...todos.value, {
        category: {
          id: '',
          title: 'Important'
        },
        deadline: '',
        done: false,
        id: randomUUID(),
        text: 'A text for the todo'
      }]})">Add mock todos</button>
      <TodoItem v-for="todo in todos.value" :todo="todo"/>
    </Main>
  </div>
</template>

<style scoped>
</style>