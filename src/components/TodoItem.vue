<script setup lang="ts">
import { ref } from "vue";
import { pastDeadline } from "../lib/utils";
  const props = defineProps<Props>();
const contextOpen = ref<boolean>(false)
interface Props {
  todos: { value: Todo[] };
  specificTodoItem: Todo;
  currentTimeRef: any;
  selectedTodo: { value: Todo | null };
}
type Todo = {
  deadline: string;
  done: boolean;
  id: number;
  text: string;
};
function toggleDone(todoItemsArray: Todo[], todoItem: Todo): void {
  props.todos.value = todoItemsArray.map((item) => {
    if (item.id === todoItem.id) {
      return {
        id: item.id,
        done: !todoItem.done,
        text: item.text,
        deadline: item.deadline,
      };
    }
    return item;
  });
}
function removeTodo(todoItemsArray: Todo[], todoItem: Todo): void {
  props.todos.value = todoItemsArray.filter((item) => item.id !== todoItem.id);
}
window.addEventListener("click", () => contextOpen.value = false)
</script>

<template>
  <div class="todo-item" @contextmenu="() => contextOpen = true">
      <div class="flex">
        <input type="checkbox" name="" id="" v-model="specificTodoItem.done" class="" />
      </div>
      <div class="flex">

        {{
            specificTodoItem.text
        }}
      </div>
      <!-- <div class="">
        <span v-if="specificTodoItem.deadline !== ''"
          >Deadline: {{ specificTodoItem.deadline }}</span
        >
      </div> -->
    <!-- <div class="">
      <button
        @click="removeTodo(todos.value, specificTodoItem)"
        class=""
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.2306 33.2306L3.76933 3.76936M3.76933 33.2306L33.2306 3.76936"
            stroke="currentColor"
            stroke-width="7"
          />
        </svg>
      </button>
      <button @click="props.selectedTodo.value = specificTodoItem">
        <svg
          width="14"
          height="14"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7.5" cy="18.5" r="4.5" fill="currentColor" />
          <circle cx="18.5" cy="18.5" r="4.5" fill="currentColor" />
          <circle cx="29.5" cy="18.5" r="4.5" fill="currentColor" />
        </svg>
      </button>
    </div> -->
    <div class="context-menu" v-if="contextOpen">
      Lorem ipsum dolor sit amet consectetur adipisicing.
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type="checkbox"] {
  &:not(:checked) {
    @apply hover:border-gray-700;
  }
  @apply appearance-none 
  transition-[background] 
  duration-100 
  border-gray-500 
  rounded-[50%] 
  w-6 h-6 
  border-2
  checked:border-black 
  relative
  overflow-hidden
  after:absolute
  after:w-full
  after:h-full
  after:top-full
  after:bg-green-400 
  checked:after:top-0
  after:transition-[top] duration-200;
}
div.todo-item {
  @apply flex p-4 items-center gap-4 ;
  &:not(:last-child) {
    @apply border-t-gray-300 border-t-2;
  }
  &:last-child {
    @apply border-y-gray-300 border-y-2;
  }
}
</style>