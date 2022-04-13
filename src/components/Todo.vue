<script lang="ts" setup>import { watch } from 'vue';

  const props = defineProps(['todo', 'todoRef'])
  console.log(props.todo)
  watch(props.todoRef, () => {
    console.log(props.todoRef.value)
  })
  props.todoRef.value = "This is some type of effect nothing special"
</script>

<template>

</template>

<style>


</style>