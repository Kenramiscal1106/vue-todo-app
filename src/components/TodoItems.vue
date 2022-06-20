<script setup lang="ts">
import { pastDeadline } from "../lib/utils";

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
  <div class="flex todo-item">
    <button
      :class="`flex-1 text-left mark-as-done-button todo-text ${
        specificTodoItem.done ? 'todo-is-done ' : ''
      } ${
        pastDeadline(specificTodoItem.deadline, currentTimeRef) &&
        !specificTodoItem.done
          ? 'deadline'
          : ''
      }`"
      @click="toggleDone(todos.value, specificTodoItem)"
    >
      <input type="checkbox" name="" id="" v-model="specificTodoItem.done" class="bg-red-600 checked:bg-green-600"/>{{
        specificTodoItem.text
      }}
      <div class="todo-text-side">
        <span v-if="specificTodoItem.deadline !== ''"
          >Deadline: {{ specificTodoItem.deadline }}</span
        >
      </div>
    </button>
    <div class="option-buttons">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  &:hover > button.todo-text {
    @apply bg-gray-300;
  }
  > button.todo-text > .todo-text-side {
    margin-left: auto;
  }
  &:hover > .option-buttons {
    opacity: 1;
  }
  > .option-buttons {
    display: flex;
    align-items: center;
    opacity: 0;
    > .remove-button {
      background: red;
      color: white;
    }
  }
}
</style>
