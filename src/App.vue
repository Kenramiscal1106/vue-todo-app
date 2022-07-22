<script setup lang="ts">
import { useCurrentTime, useLocalStorage } from './lib/get';
import type { Date } from './lib/utils';
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import { useCategoryStore, useTodoStore } from './lib/stores';
import Sidebar from './components/Sidebar.vue';
import Main from './components/Main.vue';
import AddCategory from './components/sidebar/AddCategory.vue';
import Category from './components/sidebar/Category.vue';
import TodoItem from './components/main/TodoItem.vue';
import CategoryEditor from './components/sidebar/CategoryEditor.vue';
import AddTodoItem from './components/main/AddTodoItem.vue';

const categories = useCategoryStore()
const todos = useTodoStore()

const categoryStore = useLocalStorage('categories')
const todoStore = useLocalStorage('todos');
const addVisible = reactive({category: false, todo: false})
onMounted(() => {
  if (!categoryStore.value) {
    console.log("no localstorage copy")
    categories.$reset()
    return
  }
  categories.$patch({ value: JSON.parse(categoryStore.value) })
  if (categories.value.length !== 0) {
    categories.setId(categories.value[0].id)
  }
})
onMounted(() => {
  if (!todoStore.value) {
    console.log("no localstorage copy")
    todos.$reset()
    return
  }
  todos.$patch({ value: JSON.parse(todoStore.value) })

})
watch(todos, () => {
  todoStore.set(JSON.stringify(todos.value))
})
watch(categories, () => {
  categoryStore.set(JSON.stringify(categories.value))
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
      <Category v-for="category in categories.value" :key="category.id" @click="categories.setId(category.id)" :class="{'dark:hover:bg-secondary-dark dark:bg-secondary-dark': category.id === categories.currentId}">
        {{ category.title }}
      </Category>
      <CategoryEditor v-if="addVisible.category" v-model:addCategoryVisible="addVisible"/>
      <AddCategory @click="addVisible.category = true">Add Category</AddCategory>
    </Sidebar>
    <Main>

      <TodoItem v-for="todo in todos.getTodosByCategory(categories.currentId)" :todo="todo" />
      <AddTodoItem v-if="addVisible.todo" v-model:todoVisible="addVisible"/>
      <button @click="addVisible.todo = true"
        class="flex w-full gap-2 p-2 items-center border-2 border-dotted hover:border-solid dark:border-secondary border-primary">
        <svg viewBox="0 0 20 20" class="h-6 w-6 group-hover:scale-125" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 2.5C10.3452 2.5 10.625 2.77982 10.625 3.125V9.375H16.875C17.2202 9.375 17.5 9.65482 17.5 10C17.5 10.3452 17.2202 10.625 16.875 10.625H10.625V16.875C10.625 17.2202 10.3452 17.5 10 17.5C9.65482 17.5 9.375 17.2202 9.375 16.875V10.625H3.125C2.77982 10.625 2.5 10.3452 2.5 10C2.5 9.65482 2.77982 9.375 3.125 9.375H9.375V3.125C9.375 2.77982 9.65482 2.5 10 2.5Z"
            fill="currentColor" />
        </svg>
        Add todo
      </button>
    </Main>
  </div>
</template>

<style scoped>
</style>