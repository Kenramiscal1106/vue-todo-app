<script setup lang='ts'>
import { useCategoryStore, useTodoStore } from '../../lib/stores';
import { v4 as generateUUID } from 'uuid';
import type { Todo } from '@lib/utils';
import Button from '../Button.vue';
  const {todoVisible} = defineProps<{
    todoVisible: {
      todo:boolean
    }
  }>()
  const categories = useCategoryStore();
  const todos = useTodoStore();
  function formHandler(e:any) {
    const formData = Object.fromEntries(new FormData(e.target).entries()) as Todo;
    if (formData.text === "") {
      alert("you haven't entered a deadline / text")
      return
    }
    todos.addItem({
      ...formData,
      id: generateUUID(),
      categoryId: categories.currentId,
      done: false
    })

    todoVisible.todo = false
  }
</script>
<template>
  <form @submit.prevent="formHandler" class="p-2 border-2 dark:border-secondary border-primary">
    <div class="flex flex-col">
      <input class="bg-transparent dark:text-secondary" type="text" name="text" id="text" placeholder="Enter todo...">
      <input class="bg-transparent dark:text-secondary-accent text-xs" type="datetime-local" name="deadline" id="deadline">
    </div>
    <div class="flex gap-2">
      <Button type="submit" :accent="true">submit</Button>
      <Button @click.prevent="todoVisible.todo = false">Cancel</Button>
    </div>
  </form>
</template>
<style scoped>
  
</style>