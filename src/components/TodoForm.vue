<script lang="ts" setup>
import type { Todo } from '@/lib/utils';
import {ref, watch, type Ref } from 'vue';
const todoInput: Ref<string> = ref("")
const isValidDeadline: Ref<boolean> = ref(true);
const {todoItems} = defineProps<{
  todoItems: {
    value: Todo[]
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
  <form @submit.prevent="addTodo" autocomplete="off" class="">
    <div>
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
    </div>
    <div>
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
    </div>
    <div>
      <button type="submit" class="">add todo</button>
    </div>
    <template v-if="todoDeadline !== ''">
      <div v-if="isValidDeadline">valid</div>
      <div v-else-if="!isValidDeadline">
        invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
      </div>
    </template>
  </form>
</template>

<style lang="scss">
</style>