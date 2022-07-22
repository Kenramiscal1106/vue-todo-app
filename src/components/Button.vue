<script setup lang='ts'>
  const {accent} = defineProps<{
    accent: boolean,
    [key: string]: any
  }>()
</script>
<template>
  <button :class="['px-2 py-1', {'bg-accent': accent}, {'bg-primary-light dark:bg-secondary-light': !accent}]">
    <slot></slot>
  </button>
</template>
<style scoped>
  
</style>