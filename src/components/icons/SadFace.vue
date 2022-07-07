<script setup lang="ts">
const props = defineProps<{
  width: string,
  height: string,
}>()
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 207 207" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="103.5" cy="103.5" r="100" stroke="currentColor" stroke-width="7"/>
<circle cx="155" cy="68" r="12" fill="currentColor"/>
<circle cx="51" cy="68" r="12" fill="currentColor"/>
<path d="M54 138H152" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
</svg>



</template>
<style scoped>
</style>