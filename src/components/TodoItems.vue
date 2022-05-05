<script setup lang="ts">
  interface Props {
    todos:{ value: Todo[]}
    specificTodoItem: Todo
  }
  type Todo = {
    deadline:string
    done:boolean
    id:number
    text:string
  }
  const props = defineProps<Props>()
  function toggleDone(todoItemsArray:Todo[], todoItem:Todo):void {
   props.todos.value =todoItemsArray.map((item) => {
      if (item.id === todoItem.id) {
        return {
          id:item.id,
          done:!todoItem.done,
          text:item.text,
          deadline:item.deadline
        }
      }
      return item 
    })

  }
</script>

<template>
  <button @click="toggleDone(props.todos.value, props.specificTodoItem)">Mark as done</button>
</template>

<style lang="scss" scoped>
</style>