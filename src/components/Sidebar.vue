<script setup lang='ts'>
const { time } = defineProps<{ time: string }>()
</script>
<template>
  <aside class="flex-grow-0 flex-shrink-0 basis-64 bg-primary-light dark:bg-secondary-light space-y-2 px-4 py-3">
    <div class="flex items-center gap-3">
      <h3 class="font-semibold">Categories</h3>
      <h4 class="font-medium">{{ time }}</h4>
    </div>
    <div class="space-y-1 flex flex-col items-stretch">
      <slot></slot>
    </div>
  </aside>
</template>
<style scoped>
</style>