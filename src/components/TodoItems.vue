<script setup lang="ts">
import { ref } from 'vue';
import {pastDeadline, type Date} from "../lib/utils"

interface Props {
  todos: { value: Todo[] };
  specificTodoItem: Todo;
  currentTimeRef:any
}
type Todo = {
  deadline: string;
  done: boolean;
  id: number;
  text: string;
};
const props = defineProps<Props>();
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
</script>

<template>
  <button
    :class="`flex-1 text-left mark-as-done-button todo-item ${
      specificTodoItem.done ? 'todo-is-done ' : ''
    } ${pastDeadline(specificTodoItem.deadline, currentTimeRef) && !specificTodoItem.done ? 'deadline' : ''}`"
    @click="toggleDone(todos.value, specificTodoItem)"
  >
    <input type="checkbox" name="" id="" v-model="specificTodoItem.done" />{{
      specificTodoItem.text
    }}
    <div class="todo-item-side">
      <span v-if="specificTodoItem.deadline !== ''"
        >Deadline: {{ specificTodoItem.deadline }}</span
      >
      <span class="option-buttons">
        <button
          @click="removeTodo(todos.value, specificTodoItem)"
          class="remove-button"
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
        <button>
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
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
