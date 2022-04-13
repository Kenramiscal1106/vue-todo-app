<script lang="ts" setup>
type todos = {
  deadline?:string
  done:boolean
  id:number
  text:string
}
  const props:Readonly<{
    todoItems?:todos[],
    todoItem?:todos
  }> = defineProps(['todoItems', 'todoItem'])
  props.todoItems
  console.log({
    todoItems:props.todoItems,
    todoItem:props.todoItem
  })
  function removeSelf() {
  }
</script>

<template>
  <p>{{props.todoItem.text}}</p><button @click="">remove</button>
</template>

<style>
</style>