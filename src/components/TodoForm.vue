<script lang="ts" setup>
import type { Todo } from '@/lib/utils';
import { ref, watch, type Ref } from 'vue';
import PlusIcon from './icons/PlusIcon.vue';
const todoInput: Ref<string> = ref("")
const isValidDeadline: Ref<boolean> = ref(true);
const { todoItems, modalOpen } = defineProps<{
  todoItems: {
    value: Todo[]
  },
  modalOpen: {
    value: boolean
  }
}>()
const DeadlinePattern = /(^(1[0-2]|0?[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig;
const todoDeadline: Ref<string> = ref("");

watch(todoDeadline, () => {
  if (todoDeadline.value.search(DeadlinePattern) !== -1 || todoDeadline.value === "") {
    isValidDeadline.value = true
  } else {
    isValidDeadline.value = false
  }
})
function addTodo() {
  if (todoInput.value != "" && isValidDeadline.value) {
    todoItems.value = [...todoItems.value, {
      done: false,
      id: Math.random() * 1000,
      text: todoInput.value,
      deadline: todoDeadline.value
    }]
    todoInput.value = ''
    todoDeadline.value = ""
    modalOpen.value = !modalOpen.value
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
</script>

<template>
  <form @submit.prevent="addTodo" autocomplete="off" class="p-8 bg-gray-200">
    <div class="form-subcontainer">
      <div>
        <input type="text" v-model="todoInput" id="text" placeholder="Enter todo">
      </div>
      <div>
        <label for="">Deadline: </label>
      </div>
      <!-- <div>
        <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      </div> -->
      <div class="flex gap-2 justify-end">
        <button @click="modalOpen.value = false">cancel</button>
        <button type="submit"><PlusIcon width="18" height="18"/>Add todo</button>
      </div>
      <template v-if="todoDeadline !== ''">
        <div v-if="isValidDeadline">valid</div>
        <div v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </div>
      </template>
    </div>
  </form>
</template>

<style lang="scss">
.form-subcontainer > div{
  @apply my-3 text-left;
}
input[type="text"] {
  @apply placeholder:text-black py-4 px-3;
}
form :is(button, [type="submit"]) {
  @apply px-4 py-2 bg-gray-300
  hover:bg-gray-400 flex items-center gap-2;
}
</style>