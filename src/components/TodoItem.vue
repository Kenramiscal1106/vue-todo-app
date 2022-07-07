<script setup lang="ts">
import { ref } from "vue";
import { pastDeadline, type Todo } from "../lib/utils";
  const props = defineProps<Props>();
const contextOpen = ref<boolean>(false)
interface Props {
  todos: { value: Todo[] };
  specificTodoItem: Todo;
  currentTimeRef: any;
  selectedTodo: { value: Todo | null };
}
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
  <div class="flex p-4 items-center gap-4 border-t-gray-300 border-t-[1px] last:border-y-gray-300 last:border-y-[1px]" @contextmenu="() => contextOpen = true">
      <div class="flex items-center">
        <input type="checkbox" name="" id="" v-model="specificTodoItem.done" class="" />
      </div>
      <div>
        <div>
          {{specificTodoItem.text}}
        </div>
        <div class="text-secondary-light text-sub" v-if="specificTodoItem.deadline.length !== 0">
          Due in {{specificTodoItem.deadline}}
        </div>
      </div>
      <div class="flex items-center ml-auto">
        <button @click="props.todos.value = props.todos.value.filter(todo => todo.id !== specificTodoItem.id)"
          class="p-1 border-red-500 border-2 text-red-500  rounded-md hover:text-white hover:bg-red-500 active:bg-red-700"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.68306 3.56694C2.43898 3.32286 2.43898 2.92714 2.68306 2.68306C2.92714 2.43898 3.32287 2.43898 3.56694 2.68306L10 9.11612L16.4331 2.68306C16.6771 2.43898 17.0729 2.43898 17.3169 2.68306C17.561 2.92714 17.561 3.32286 17.3169 3.56694L10.8839 10L17.3169 16.4331C17.561 16.6771 17.561 17.0729 17.3169 17.3169C17.0729 17.561 16.6771 17.561 16.4331 17.3169L10 10.8839L3.56694 17.3169C3.32287 17.561 2.92714 17.561 2.68306 17.3169C2.43898 17.0729 2.43898 16.6771 2.68306 16.4331L9.11612 10L2.68306 3.56694Z" fill="currentColor"/>
          </svg>

        </button>
      </div>
      <!-- <div class="">
        <span v-if="specificTodoItem.deadline !== ''"
          >Deadline: {{ specificTodoItem.deadline }}</span
        >
      </div>
      <div class="">
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
</style>